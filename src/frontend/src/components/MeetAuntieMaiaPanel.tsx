import BubbleCard from './BubbleCard';
import { Heart, Star } from 'lucide-react';

export default function MeetAuntieMaiaPanel() {
  return (
    <BubbleCard size="lg" className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-display font-bold text-foreground flex items-center justify-center">
          <Heart className="w-6 h-6 mr-2 text-primary fill-current" />
          Meet Auntie Maia
        </h2>
        <p className="text-muted-foreground">
          Your child's home away from home
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
        <img
          src="/assets/generated/meet-auntie-maia-portrait.dim_800x800.png"
          alt="Auntie Maia"
          className="w-full h-auto"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Star className="w-5 h-5 text-accent fill-current flex-shrink-0 mt-1" />
          <p className="text-sm text-foreground">
            <strong>15+ years</strong> of experience creating loving, nurturing environments for children
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <Star className="w-5 h-5 text-accent fill-current flex-shrink-0 mt-1" />
          <p className="text-sm text-foreground">
            <strong>Certified</strong> in early childhood education and first aid
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <Star className="w-5 h-5 text-accent fill-current flex-shrink-0 mt-1" />
          <p className="text-sm text-foreground">
            <strong>Passionate</strong> about creating a safe, playful space where every child thrives
          </p>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-border/50">
        <p className="text-sm text-muted-foreground italic text-center">
          "Every child deserves to feel loved, safe, and excited to learn. That's what we create here at the Clubhouse."
        </p>
      </div>
    </BubbleCard>
  );
}
