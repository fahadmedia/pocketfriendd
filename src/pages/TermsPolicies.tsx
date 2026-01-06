import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Users, Percent, Clock, Store, Ban, Lock, Mail, MessageCircle, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const TermsPolicies = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 200 }
    },
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#041C45" }}>
      <Header />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 px-4 pb-28 space-y-6"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="text-center py-6"
        >
          <motion.div
            variants={iconVariants}
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
          >
            <Shield className="w-8 h-8" style={{ color: "#FF8A00" }} />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
            Terms & Policies
          </h2>
          <p className="text-sm opacity-80" style={{ color: "#FFFFFF" }}>
            Everything you need to know about using PocketFriend — clearly, honestly, and simply.
          </p>
        </motion.div>

        {/* Terms & Conditions Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: "#FF8A00" }}
            />
            <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>
              Terms & Conditions
            </h3>
          </div>
        </motion.div>

        {/* Section 1: Using PocketFriend */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              variants={iconVariants}
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
            >
              <Info className="w-5 h-5" style={{ color: "#FF8A00" }} />
            </motion.div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "#FFFFFF" }}>
                1. Using PocketFriend
              </h4>
              <p className="text-sm leading-relaxed opacity-90" style={{ color: "#FFFFFF" }}>
                PocketFriend is your friendly guide to discovering amazing restaurant deals across Australia.
                We connect you with exclusive offers from local eateries - from your favourite pizza spots to
                gourmet continental restaurants.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#FF8A00" }} />
                  <span className="text-sm opacity-80" style={{ color: "#FFFFFF" }}>
                    We're a discovery platform that helps you find great deals
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#FF8A00" }} />
                  <span className="text-sm opacity-80" style={{ color: "#FFFFFF" }}>
                    We connect you directly with participating restaurants
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#FF8A00" }} />
                  <span className="text-sm opacity-80" style={{ color: "#FFFFFF" }}>
                    Payment is handled directly by restaurants - we don't process transactions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Eligibility */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              variants={iconVariants}
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
            >
              <Users className="w-5 h-5" style={{ color: "#FF8A00" }} />
            </motion.div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "#FFFFFF" }}>
                2. Who Can Use PocketFriend
              </h4>
              <p className="text-sm leading-relaxed opacity-90 mb-4" style={{ color: "#FFFFFF" }}>
                We've designed PocketFriend for students, professionals, and anyone who loves a good meal
                at a great price. Here's what you need to know:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255, 138, 0, 0.1)" }}>
                  <span className="text-lg">🎂</span>
                  <span className="text-sm" style={{ color: "#FFFFFF" }}>You must be 16 years or older to use PocketFriend</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255, 138, 0, 0.1)" }}>
                  <span className="text-lg">👤</span>
                  <span className="text-sm" style={{ color: "#FFFFFF" }}>One account per person — keep it personal!</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255, 138, 0, 0.1)" }}>
                  <span className="text-lg">🏠</span>
                  <span className="text-sm" style={{ color: "#FFFFFF" }}>Accounts are for personal use only, not commercial purposes</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: How Discounts Work */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              variants={iconVariants}
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
            >
              <Percent className="w-5 h-5" style={{ color: "#FF8A00" }} />
            </motion.div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "#FFFFFF" }}>
                3. How Discounts Work
              </h4>
              <p className="text-sm leading-relaxed opacity-90 mb-4" style={{ color: "#FFFFFF" }}>
                Getting your discount is simple! Here's the step-by-step process:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: "#FF8A00", color: "#FFFFFF" }}
                  >
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>Visit the restaurant</p>
                    <p className="text-xs opacity-70" style={{ color: "#FFFFFF" }}>Head to any participating PocketFriend restaurant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: "#FF8A00", color: "#FFFFFF" }}
                  >
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>Scan the QR code</p>
                    <p className="text-xs opacity-70" style={{ color: "#FFFFFF" }}>Use your PocketFriend app to scan the restaurant's QR code</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: "#FF8A00", color: "#FFFFFF" }}
                  >
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>Show your discount</p>
                    <p className="text-xs opacity-70" style={{ color: "#FFFFFF" }}>Your discount appears instantly — show it to staff when ordering</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: "#FF8A00", color: "#FFFFFF" }}
                  >
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>Enjoy your savings!</p>
                    <p className="text-xs opacity-70" style={{ color: "#FFFFFF" }}>The restaurant applies your discount at checkout</p>
                  </div>
                </div>
              </div>
              <div
                className="mt-4 p-3 rounded-xl border"
                style={{ borderColor: "rgba(255, 138, 0, 0.3)", backgroundColor: "rgba(255, 138, 0, 0.1)" }}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#FF8A00" }} />
                  <p className="text-xs" style={{ color: "#FFFFFF" }}>
                    <span className="font-semibold">Good to know:</span> Discounts are time-limited after scanning.
                    Restaurants manually apply discounts - PocketFriend doesn't control their billing systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Fair Usage */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              variants={iconVariants}
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
            >
              <Clock className="w-5 h-5" style={{ color: "#FF8A00" }} />
            </motion.div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "#FFFFFF" }}>
                4. Fair Usage & Cooldowns
              </h4>
              <p className="text-sm leading-relaxed opacity-90 mb-4" style={{ color: "#FFFFFF" }}>
                We believe everyone deserves a fair chance at great deals. To keep things balanced:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#FF8A00" }} />
                  <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>
                    Discounts are designed to be fair for all PocketFriend users
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#FF8A00" }} />
                  <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>
                    Some restaurants may set cooldown periods between redemptions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#FF8A00" }} />
                  <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>
                    Repeated misuse may result in temporary restrictions - let's keep it fun for everyone!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Section 5: Restaurant Responsibility */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              variants={iconVariants}
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
            >
              <Store className="w-5 h-5" style={{ color: "#FF8A00" }} />
            </motion.div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "#FFFFFF" }}>
                5. Restaurant Responsibility
              </h4>
              <p className="text-sm leading-relaxed opacity-90 mb-4" style={{ color: "#FFFFFF" }}>
                Our partner restaurants are the heroes behind every delicious deal. Here's how it works:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#FF8A00" }} />
                  <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>
                    Restaurants create and manage their own offers on PocketFriend
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#FF8A00" }} />
                  <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>
                    They may update or remove deals at any time based on availability
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#FF8A00" }} />
                  <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>
                    Menu pricing and changes are controlled entirely by restaurants
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Section 6: Account Suspension */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              variants={iconVariants}
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
            >
              <Ban className="w-5 h-5" style={{ color: "#FF8A00" }} />
            </motion.div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "#FFFFFF" }}>
                6. Keeping PocketFriend Safe
              </h4>
              <p className="text-sm leading-relaxed opacity-90 mb-4" style={{ color: "#FFFFFF" }}>
                We work hard to keep PocketFriend a trustworthy platform for everyone. To protect our
                community of users and restaurant partners:
              </p>
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: "rgba(255, 138, 0, 0.1)" }}
              >
                <p className="text-sm" style={{ color: "#FFFFFF" }}>
                  Fraudulent activity, abuse of the system, or attempts to manipulate deals may result in
                  account suspension. This helps protect restaurants and ensures honest users can continue
                  enjoying great savings.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Policy Section Header */}
        <motion.div variants={itemVariants} className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: "#FF8A00" }}
            />
            <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>
              Privacy Policy
            </h3>
          </div>
        </motion.div>

        {/* Privacy Policy Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              variants={iconVariants}
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
            >
              <Lock className="w-5 h-5" style={{ color: "#FF8A00" }} />
            </motion.div>
            <div className="flex-1">
              <h4 className="font-semibold mb-3" style={{ color: "#FFFFFF" }}>
                Your Privacy Matters
              </h4>
              <p className="text-sm leading-relaxed opacity-90 mb-5" style={{ color: "#FFFFFF" }}>
                At PocketFriend, we're committed to being transparent about how we handle your information.
                Your trust means everything to us.
              </p>

              {/* What We Collect */}
              <div className="mb-5">
                <h5 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#FF8A00" }}>
                  <CheckCircle className="w-4 h-4" />
                  What We Collect
                </h5>
                <div className="space-y-2 ml-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF8A00" }} />
                    <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>Your name (if you choose to provide it)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF8A00" }} />
                    <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>App activity like discount redemptions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF8A00" }} />
                    <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>Basic device information for app functionality</span>
                  </div>
                </div>
              </div>

              {/* What We DON'T Collect */}
              <div className="mb-5">
                <h5 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#22C55E" }}>
                  <Shield className="w-4 h-4" />
                  What We DON'T Collect
                </h5>
                <div
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>No Payment Information</p>
                      <p className="text-xs opacity-70" style={{ color: "#FFFFFF" }}>
                        We never collect or store your credit card, debit card, or any payment details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How We Use Your Data */}
              <div className="mb-5">
                <h5 className="text-sm font-semibold mb-3" style={{ color: "#FF8A00" }}>
                  How We Use Your Data
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="p-3 rounded-xl text-center"
                    style={{ backgroundColor: "rgba(255, 138, 0, 0.1)" }}
                  >
                    <span className="text-xl mb-1 block">✨</span>
                    <span className="text-xs" style={{ color: "#FFFFFF" }}>Improve your app experience</span>
                  </div>
                  <div
                    className="p-3 rounded-xl text-center"
                    style={{ backgroundColor: "rgba(255, 138, 0, 0.1)" }}
                  >
                    <span className="text-xl mb-1 block">🛡️</span>
                    <span className="text-xs" style={{ color: "#FFFFFF" }}>Prevent misuse & fraud</span>
                  </div>
                </div>
              </div>

              {/* Data Protection */}
              <div>
                <h5 className="text-sm font-semibold mb-3" style={{ color: "#FF8A00" }}>
                  Data Protection Promise
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: "#22C55E" }} />
                    <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>Your data is stored securely with encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: "#22C55E" }} />
                    <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>We NEVER sell your information to third parties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: "#22C55E" }} />
                    <span className="text-sm opacity-90" style={{ color: "#FFFFFF" }}>You can request data deletion anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div variants={itemVariants} className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: "#FF8A00" }}
            />
            <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>
              Support & Contact
            </h3>
          </div>
        </motion.div>

        {/* Support Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, rgba(255, 138, 0, 0.2) 0%, rgba(255, 138, 0, 0.05) 100%)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div className="text-center">
            <motion.div
              variants={iconVariants}
              className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FF8A00" }}
            >
              <MessageCircle className="w-7 h-7" style={{ color: "#FFFFFF" }} />
            </motion.div>
            <h4 className="font-semibold text-lg mb-2" style={{ color: "#FFFFFF" }}>
              Questions or feedback?
            </h4>
            <p className="text-sm opacity-80 mb-5" style={{ color: "#FFFFFF" }}>
              We're always happy to help. If you have any questions, concerns, or suggestions,
              feel free to reach out - we'd love to hear from you!
            </p>
            <motion.a
              href="mailto:pocketfriend.au@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
              style={{ backgroundColor: "#FF8A00", color: "#FFFFFF" }}
            >
              <Mail className="w-5 h-5" />
              pocketfriend.au@gmail.com
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center pt-6"
        >
          <p className="text-xs opacity-50" style={{ color: "#FFFFFF" }}>
            Last updated: December 2024
          </p>
          <p className="text-xs opacity-50 mt-1" style={{ color: "#FFFFFF" }}>
            PocketFriend Australia Pty Ltd
          </p>
        </motion.div>
      </motion.main>

      <BottomNav />
    </div>
  );
};

export default TermsPolicies;
