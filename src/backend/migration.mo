import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Array "mo:core/Array";

module {
  type OldBooking = {
    id : Nat;
    parent : Principal;
    timestamp : Time.Time;
    requestedTime : Time.Time;
    status : {
      #pending;
      #confirmed;
      #cancelled;
      #completed;
    };
    details : Text;
  };

  type OldActor = {
    bookings : Map.Map<Nat, OldBooking>;
  };

  type NewBooking = {
    id : Nat;
    parent : Principal;
    timestamp : Time.Time;
    requestedTime : Time.Time;
    status : {
      #pending;
      #confirmed;
      #cancelled;
      #completed;
    };
    details : Text;
    contact : {
      name : Text;
      email : Text;
    };
    notes : Text;
  };

  type NewActor = {
    bookings : Map.Map<Nat, NewBooking>;
  };

  public func run(old : OldActor) : NewActor {
    let newBookings = Map.empty<Nat, NewBooking>();
    
    for ((id, oldBooking) in old.bookings.entries()) {
      let newBooking : NewBooking = {
        id = oldBooking.id;
        parent = oldBooking.parent;
        timestamp = oldBooking.timestamp;
        requestedTime = oldBooking.requestedTime;
        status = oldBooking.status;
        details = oldBooking.details;
        contact = { name = ""; email = "" };
        notes = "";
      };
      newBookings.add(id, newBooking);
    };
    
    { bookings = newBookings };
  };
};
