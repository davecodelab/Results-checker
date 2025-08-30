"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type ModalType = "buy" | "retrieve" | null;

export default function CheckerCards() {
  const [modal, setModal] = useState<ModalType>(null);

  // Buy state
  const [quantity, setQuantity] = useState(1);
  const [cardType, setCardType] = useState("");
  const [buyError, setBuyError] = useState("");

  // Retrieve state
  const [transactionId, setTransactionId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [retrieveError, setRetrieveError] = useState("");

  // --- Buy card validation ---
  const handleBuySubmit = () => {
    if (!cardType) {
      setBuyError("Please select a card type.");
      return;
    }
    if (quantity < 1 || quantity > 100) {
      setBuyError("Quantity must be between 1 and 100.");
      return;
    }
    setBuyError("");
    alert(`✅ Order placed: ${quantity} x ${cardType.toUpperCase()} card(s)`);
    setModal(null);
  };

  // --- Retrieve validation ---
  const handleRetrieveSubmit = () => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setRetrieveError("Enter a valid phone number (10 digits).");
      return;
    }
    if (!transactionId.trim()) {
      setRetrieveError("Transaction ID is required.");
      return;
    }
    setRetrieveError("");
    alert(`✅ Retrieval request submitted for Transaction ID: ${transactionId}`);
    setModal(null);
  };

  return (
    <section className="px-4 py-10 max-w-6xl mx-auto">
      {/* --- Title --- */}
      <div className="text-center mb-8">
      <h1 className="text-3xl md:text-3xl font-bold text-center text-white mb-8">
        Welcome to Checkers Hub
      </h1>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- Buy Card --- */}
        <Card className="shadow-lg rounded-2xl hover:shadow-xl transition min-h-[300px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl font-bold">Buy Results Checker</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between flex-grow">
            <div>
              <p className="text-gray-600 mb-4">
                Purchase your WASSCE or BECE result checkers instantly and securely.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" /> Very affordable
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" /> Super fast & reliable
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" /> Unit & bulk purchases
                </li>
              </ul>
            </div>
            <Button onClick={() => setModal("buy")} className="w-full mt-6 bg-green-600 text-white">
              Buy Card Now
            </Button>
          </CardContent>
        </Card>

        {/* --- Retrieve Card --- */}
        <Card className="shadow-lg rounded-2xl hover:shadow-xl transition min-h-[300px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl font-bold">Retrieve Your Checker</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between flex-grow">
            <div>
              <p className="text-gray-600 mb-4">
                Retrieve your purchased result checkers using your phone number and transaction ID.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" /> Easy lookup
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" /> Instant access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" /> Secure retrieval
                </li>
              </ul>
            </div>
            <Button onClick={() => setModal("retrieve")} className="w-auto mt-6 bg-green-600 text-white">
              Retrieve Card
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* --- Buy Modal --- */}
      <Dialog open={modal === "buy"} onOpenChange={() => setModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buy a Checker</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardType">Select Card Type</Label>
              <Select onValueChange={(val) => setCardType(val)}>
                <SelectTrigger id="cardType">
                  <SelectValue placeholder="Choose WASSCE or BECE" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wassce">WASSCE</SelectItem>
                  <SelectItem value="bece">BECE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type="number"
                id="quantity"
                min={1}
                max={100}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={cn(
                  quantity < 1 || quantity > 100 ? "border-red-500" : ""
                )}
              />
            </div>
            {buyError && <p className="text-red-500 text-sm">{buyError}</p>}
            <Button className="w-full mt-4 bg-green-600 text-white" onClick={handleBuySubmit}>
              Complete Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- Retrieve Modal --- */}
      <Dialog open={modal === "retrieve"} onOpenChange={() => setModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Retrieve Checker</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className={cn(
                  phoneNumber && !/^[0-9]{10,10}$/.test(phoneNumber)
                    ? "border-red-500"
                    : ""
                )}
              />
            </div>
            <div>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your transaction ID"
              />
            </div>
            {retrieveError && (
              <p className="text-red-500 text-sm">{retrieveError}</p>
            )}
            <Button className="w-full mt-4 bg-green-600 text-white" onClick={handleRetrieveSubmit}>
              Retrieve Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
