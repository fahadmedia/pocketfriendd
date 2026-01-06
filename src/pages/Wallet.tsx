import { motion } from "framer-motion";
import { Wallet as WalletIcon, CreditCard, Gift, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const transactions = [
  { id: 1, name: "Bella Italia", amount: "-$24.50", date: "Today, 2:30 PM", type: "spent" },
  { id: 2, name: "Cashback Reward", amount: "+$5.00", date: "Yesterday", type: "earned" },
  { id: 3, name: "Grill Masters", amount: "-$18.90", date: "Dec 10, 2024", type: "spent" },
  { id: 4, name: "Referral Bonus", amount: "+$10.00", date: "Dec 8, 2024", type: "earned" },
];

const WalletPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-28 px-4">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative card-premium p-6 mb-6 overflow-hidden"
        >
          {/* Glow Effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <WalletIcon className="w-5 h-5 text-primary" />
              <span className="text-foreground/60 text-sm">Available Balance</span>
            </div>

            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-4xl font-bold text-foreground mb-2"
            >
              $156.50
            </motion.h2>

            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+$23.40 this month</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/20 text-primary font-medium"
            >
              <CreditCard className="w-4 h-4" />
              Top Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-foreground font-medium"
            >
              <Gift className="w-4 h-4" />
              Redeem
            </motion.button>
          </div>
        </motion.div>

        {/* Rewards Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Reward Points</h3>
            <span className="text-primary font-bold">1,240 pts</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "62%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <p className="text-foreground/50 text-xs mt-2">760 points to next reward</p>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-bold text-foreground mb-4">Recent Transactions</h3>
          
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card-premium p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'earned' ? 'bg-green-500/20' : 'bg-secondary'}`}>
                    {transaction.type === 'earned' ? (
                      <Gift className="w-4 h-4 text-green-400" />
                    ) : (
                      <CreditCard className="w-4 h-4 text-foreground/60" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{transaction.name}</p>
                    <p className="text-foreground/50 text-xs">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${transaction.type === 'earned' ? 'text-green-400' : 'text-foreground'}`}>
                  {transaction.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default WalletPage;
