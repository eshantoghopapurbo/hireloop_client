"use client";

import { Button } from "@heroui/react";
import {
CrownDiamond,
  ChartColumn,
  ArrowRightFromLine,
  Plus,
  Thunderbolt,
} from "@gravity-ui/icons";

const plans = [
  {
    name: "Starter",
    price: "$0",
    icon: CrownDiamond,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    price: "$17",
    popular: true,
    icon: ChartColumn,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    price: "$99",
    icon:   Thunderbolt,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="bg-black py-24 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-400">
            <span className="h-2 w-2 bg-violet-500" />
            Pricing
            <span className="h-2 w-2 bg-violet-500" />
          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-semibold text-white leading-tight">
            Pay for the leverage,
            <br />
            not the listings
          </h2>

          {/* Toggle */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center rounded-full border border-zinc-800 bg-zinc-900 p-1">
              <button className="rounded-full bg-white px-6 py-2 text-black font-medium">
                Monthly
              </button>

              <button className="px-5 py-2 text-zinc-300">
                Yearly
              </button>

              <span className="mr-1 rounded-full bg-fuchsia-600 px-3 py-1 text-sm text-white">
                25%
              </span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`rounded-3xl border p-6 ${
                  plan.popular
                    ? "border-zinc-600 bg-zinc-950 shadow-[0_0_50px_rgba(255,255,255,0.08)]"
                    : "border-zinc-900 bg-black"
                }`}
              >
                {/* Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-zinc-800 p-3">
                      <Icon className="h-5 w-5 text-violet-400" />
                    </div>

                    <h3 className="text-2xl text-white">
                      {plan.name}
                    </h3>
                  </div>

                  <div>
                    <span className="text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-zinc-400">
                      /month
                    </span>
                  </div>
                </div>

                <p className="mt-10 text-lg text-white">
                  Start building your insights hub:
                </p>

                {/* Features */}
                <div className="mt-8 space-y-5">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="rounded-md bg-zinc-800 p-1">
                        <Plus className="h-4 w-4 text-white" />
                      </div>

                      <span className="text-zinc-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Button
                  radius="lg"
                  className={`mt-12 h-14 w-full text-base ${
                    plan.popular
                      ? "bg-white text-black"
                      : "bg-zinc-900 text-white"
                  }`}
                >
                  <span className="flex w-full items-center justify-between">
                    Choose This Plan
                    <ArrowRightFromLine />
                  </span>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}