import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Quote } from "lucide-react";

const testimonials = [
  "Do you paint or play an instrument? I could tell. It's important for a massage therapist to treat their work like a canvas. You do.",
  "Unbelievable. Profoundly relaxing.",
  "Did I snore?",
  "I just melted into the table.",
  "I like that your massage is symmetrical.",
  "I know 40 or 50 massage therapists. You're my favorite. You're the best. This is art and I'm comfortable. I always feel fortunate when I can get an appointment.",
  "I feel like a celebrity.",
  "Deb I just have to say you are amazing thank you for the way you go above and beyond giving extra time and your hands are amazing! Thank you so much",
  "Good morning Deb I was just calling to thank you for a very relaxing massage enjoyable sleep like a rock last night and I feel great this morning.",
  "Thank you for my first ever massage. It was really relaxing.",
  "That was an extraordinary massage.",
  "That was next level.",
  "It's been a long time... I'm not in the area anymore. Hope things are well! Those who seek your services should be grateful with your unique massages!!!",
  "Not sure if you remember me... I've seen you probably half dozen times. I will say, your massages are like no other than I have ever received since then. Though it was professional, you worked those areas that most therapists don't get close to.",
  "I was a loyal and frequent customer... I'd periodically check to see if you made it back to Mass. One day I was delighted to see that you had. You were the best massage therapist I ever had. On my next trip home I'll stop by to experience your magic touch once again.",
  "Your energy is really good. I've had more than 1000 massages and never had one like this.",
  "Thank you Deb I can't wait to check out your new place! Nobody is as good as you I can't be comfortable on anyone else's table I'm so worried they will be too rough! YOU ARE THE BEST!",
  "Your adductor massage is phenomenal.",
  "That was a fabulous massage.",
  "I slept good.",
  "Thank you very much for the relaxing massage on Sunday evening.",
  "It was amazing. My body is much less tight, and feels alive! You put a lot of effort into your work. Much appreciated!",
  "Congrats Deb. I see you moved. I will still come to see you. Nobody is as good as you!",
  "This is like a ballet.",
  "The only time I can sleep without meds is when I visit you.",
  "The Hall of Fame hands.",
  "Thank you for the great massage this morning.",
  "Deb, Thank you so much you are wonderful truly just what I'm looking for I have a hard time relaxing during massage you had me almost falling asleep I will be booking anytime I'm going down that way.",
  "You're a godsend.",
  "This was the most relaxing massage, not deep but very relaxing.",
  "I went to sleep like three times.",
  "It's not hard to relax with you.",
  "You have the hands of a goddess.",
  "You're great. No, you're wonderful.",
  "Amazing, the trance that puts you in.",
  "Thanks again for the session yesterday, was incredible. Remember the range of motion we discussed? The little bit of work had some good results.",
  "Thanks for the terrific massage. As always I felt as though I had been touched by an angel.",
  "Between your prices and your style... You can't beat it! Wish I lived closer so I could visit more often.",
  "Hands down you are the best in relaxation.",
  "That was surreal.",
  "You have a wonderful and very relaxing massage, definitely one of the best I have ever had! I wish I lived closer as I'd see you weekly!",
  "Deb thanks for the first real massage I ever had! The massage was great.",
  "The love of your work shows in your massage.",
  "Thank you thank you thank you, what a great professional and complete massage, I feel great. It was also very nice to have someone so pleasant, intelligent and down to earth. Such a wonderful massage.",
  "That was other-worldly.",
  "Seriously I think that was the best massage ever.",
  "Had a great time meeting you, the massage was great. I look forward to another relaxing session soon.",
  "Just wanted to thank you, thank you, thank you for the treatment this afternoon, esp. the neck shoulder.",
  "That was the best neck massage I ever had.",
  "That was great. I was relaxed and invigorated all at the same time.",
  "I never thought I could be so comfortable with someone. Thanks for the great massage!",
  "Thanks for the wonderful massage. It really was a go to sleep massage.",
  "You just give a super awesome massage.",
  "Thank you! I slept great last night!",
  "Thank you Deb for a wonderful massage I literally fell asleep at one point. Best massage I've had in a while. Thank you.",
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Testimonials" subtitle="Real words from real clients" />

      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {testimonials.map((text, i) => (
              <div
                key={i}
                className="break-inside-avoid bg-card rounded-lg p-6 shadow-soft border border-border/40 relative"
              >
                <Quote className="w-6 h-6 text-primary/20 mb-3" />
                <p className="font-body text-sm text-muted-foreground leading-relaxed italic">
                  "{text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
