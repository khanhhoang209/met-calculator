"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function MetSavingCalculator() {
  const [distance, setDistance] = useState(12);
  const [vehicle, setVehicle] = useState("Xe tay ga");
  const [frequency, setFrequency] = useState(5);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const [gasCost, setGasCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [batteryCost, setBatteryCost] = useState(0);
  const [co2Reduction, setCo2Reduction] = useState(0);

  useEffect(() => {
    const ratePerKm: Record<string, number> = {
      "Xe tay ga": 0.3,
      "Xe số": 0.25,
      "Xe ô tô": 0.7,
    };
    const fuelPrice = 25000;
    const batteryCostPerKm = 0.2 * 25000;
    const co2PerKm = 0.12;

    const distancePerWeek = distance * frequency;
    const consumedFuel = (ratePerKm[vehicle] || 0.3) * distancePerWeek;
    const calculatedGasCost = consumedFuel * fuelPrice;
    const calculatedBatteryCost = batteryCostPerKm * distancePerWeek;
    const calculatedSavings = calculatedGasCost - calculatedBatteryCost;
    const calculatedCO2 = distancePerWeek * co2PerKm;

    setGasCost(Math.round(calculatedGasCost));
    setBatteryCost(Math.round(calculatedBatteryCost));
    setSavings(Math.round(calculatedSavings));
    setCo2Reduction(Math.round(calculatedCO2));
  }, [distance, vehicle, frequency]);

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-3xl border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1
        className="text-3xl font-extrabold text-center mb-4 whitespace-nowrap"
        style={{
          color: "#d7f00f",
          WebkitTextStroke: "1px black",
        }}
      >
        CHỈ CẦN VƯỢT NGÀN MÉT
      </h1>
      <h1
        className="text-3xl font-extrabold text-center mb-4"
        style={{ color: "#d7f00f", WebkitTextStroke: "1px black" }}
      >
        CÒN LẠI ĐỂ MET LO
      </h1>

      <div className="space-y-5">
        <div>
          <Label
            htmlFor="distance"
            className="text-sm font-medium text-gray-700"
          >
            Quãng đường di chuyển hàng ngày (km)
          </Label>
          <Input
            id="distance"
            type="number"
            className="mt-1"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">
            Phương tiện đang sử dụng hiện tại
          </Label>
          <Select value={vehicle} onValueChange={setVehicle}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Chọn phương tiện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Xe tay ga">Xe tay ga</SelectItem>
              <SelectItem value="Xe số">Xe số</SelectItem>
              <SelectItem value="Xe ô tô">Xe ô tô</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">
            Tuần suất di chuyển
          </Label>
          <Select
            value={frequency.toString()}
            onValueChange={(v) => setFrequency(Number(v))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Chọn tần suất" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 ngày/tuần</SelectItem>
              <SelectItem value="3">3 ngày/tuần</SelectItem>
              <SelectItem value="5">5 ngày/tuần</SelectItem>
              <SelectItem value="7">7 ngày/tuần</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700">
            Bật định vị để xác định vị trí
          </Label>
          <Switch
            checked={locationEnabled}
            onCheckedChange={setLocationEnabled}
            className="data-[state=checked]:bg-[#d7f00f] data-[state=unchecked]:bg-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 whitespace-nowrap">
        {[
          {
            label: "Số tiền xăng tiêu hao",
            value: `${gasCost.toLocaleString()} VNĐ`,
          },
          {
            label: "Số tiền tiết kiệm",
            value: `${savings.toLocaleString()} VNĐ`,
          },
          {
            label: "% Pin cần dùng (ước tính)",
            value: `${batteryCost.toLocaleString()} VNĐ`,
          },
          {
            label: "Lượng CO₂ giảm thải",
            value: `~${co2Reduction} kg`,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card className="p-4 text-center border border-green-100 shadow-sm">
              <CardContent>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p
                  className="text-lg font-bold mt-2"
                  style={{ color: "#d7f00f" }}
                >
                  {item.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
