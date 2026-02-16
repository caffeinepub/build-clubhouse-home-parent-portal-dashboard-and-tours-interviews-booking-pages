import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Booking Management
  module Booking {
    public type Status = {
      #pending;
      #confirmed;
      #cancelled;
      #completed;
    };

    public type ParentContact = {
      name : Text;
      email : Text;
    };

    public type Request = {
      id : Nat;
      parent : Principal;
      timestamp : Time.Time;
      requestedTime : Time.Time;
      status : Status;
      details : Text;
      contact : ParentContact;
      notes : Text;
    };

    public func compare(a : Request, b : Request) : { #less; #equal; #greater } {
      if (a.timestamp < b.timestamp) {
        #less;
      } else if (a.timestamp > b.timestamp) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  var nextBookingId = 0;
  let bookings = Map.empty<Nat, Booking.Request>();

  public type BookingInput = {
    requestedTime : Time.Time;
    details : Text;
    contact : Booking.ParentContact;
    notes : Text;
  };

  public shared ({ caller }) func createBookingRequest(input : BookingInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create bookings");
    };

    let booking : Booking.Request = {
      id = nextBookingId;
      parent = caller;
      timestamp = Time.now();
      requestedTime = input.requestedTime;
      status = #pending;
      details = input.details;
      contact = input.contact;
      notes = input.notes;
    };

    bookings.add(nextBookingId, booking);
    nextBookingId += 1;
    booking.id;
  };

  public query ({ caller }) func listAllBookings() : async [Booking.Request] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view bookings");
    };

    let isAdmin = AccessControl.isAdmin(accessControlState, caller);

    let filteredBookings = if (isAdmin) {
      bookings.values().toArray();
    } else {
      bookings.values().toArray().filter(func(booking : Booking.Request) : Bool {
        booking.parent == caller;
      });
    };

    filteredBookings.sort();
  };

  public query ({ caller }) func getBookingById(id : Nat) : async Booking.Request {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view bookings");
    };

    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        if (booking.parent != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own bookings");
        };
        booking;
      };
    };
  };

  public shared ({ caller }) func updateBookingStatus(id : Nat, status : Booking.Status) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update bookings");
    };

    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = { booking with status };
        bookings.add(id, updatedBooking);
      };
    };
  };
};
