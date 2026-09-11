import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, MessageSquare } from "lucide-react";

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Book Online" subtitle="" />

      <section className="py-12">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-primary">Ready to Book Your Session?</h2>
                <p className="text-muted-foreground">
                  Click below to view availability and schedule your appointment.
                </p>
              </div>

              <div className="bg-card border border-primary/10 rounded-lg p-6 text-left shadow-sm">
                <ol className="space-y-6 list-none">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                      1
                    </span>
                    <p className="text-muted-foreground pt-1">
                      First you log in or sign up.  On the next page click on "New booking".  Then you'll be brought to a services page.  Click the service you want.  The next page will ask if you want hot towels.  Then the calendar page will open.  Pay attention to what day you're choosing.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                      2
                    </span>
                    <p className="text-muted-foreground pt-1">
                      At the next screen, review what you've entered, press the credit card icon or press "Pay later", read the cancellation policy, terms and conditions, and press "Confirm booking!".  You'll receive a confirmation screen that states "Booking confirmed", a booking number and dollar amount due.  You will also receive a confirmation email with a link to manage your appointment if it's NOT same day.  The confirmation screen, confirmation email and reminder email are your confirmations.  No person will call you to confirm.  If you do not receive a confirmation screen, you do not have an appointment!  Start over.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                      3
                    </span>
                    <p className="text-muted-foreground pt-1">
                      It is your responsibility to check what you've entered.  If you entered something incorrectly, use the link in your confirmation email to fix it.  The link will not work less than 12 hours prior to appointments.  If it's under 12 hours, you need to CALL.
                    </p>
                  </li>
                </ol>
              </div>

              <Button asChild size="lg" className="text-lg px-10 py-6">
                <a
                  href="https://bookeo.com/earthy-wellness/customer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now <ExternalLink className="ml-2" />
                </a>
              </Button>
            </div>

            <div className="border-t border-primary/10 pt-8 space-y-3">
              <p className="text-muted-foreground text-sm font-semibold">Prefer to reach us directly?</p>
              <p className="text-muted-foreground text-sm">
                New clients please call.  Existing clients can call or text.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button asChild variant="outline">
                  <a href="tel:+14133278496">
                    <Phone className="mr-2 h-4 w-4" /> Call
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="sms:+14133278496">
                    <MessageSquare className="mr-2 h-4 w-4" /> Text
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;
