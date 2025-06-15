
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const stateTaxRates = {
  'AL': 0.04, 'AK': 0.00, 'AZ': 0.056, 'AR': 0.065, 'CA': 0.0725, 'CO': 0.029, 'CT': 0.0635,
  'DE': 0.00, 'FL': 0.06, 'GA': 0.04, 'HI': 0.04, 'ID': 0.06, 'IL': 0.0625, 'IN': 0.07,
  'IA': 0.06, 'KS': 0.065, 'KY': 0.06, 'LA': 0.0445, 'ME': 0.055, 'MD': 0.06, 'MA': 0.0625,
  'MI': 0.06, 'MN': 0.06875, 'MS': 0.07, 'MO': 0.04225, 'MT': 0.00, 'NE': 0.055, 'NV': 0.0685,
  'NH': 0.00, 'NJ': 0.06625, 'NM': 0.05125, 'NY': 0.08875, 'NC': 0.0475, 'ND': 0.05, 'OH': 0.0575,
  'OK': 0.045, 'OR': 0.00, 'PA': 0.06, 'RI': 0.07, 'SC': 0.06, 'SD': 0.045, 'TN': 0.07,
  'TX': 0.0625, 'UT': 0.061, 'VT': 0.06, 'VA': 0.053, 'WA': 0.065, 'WV': 0.06, 'WI': 0.05,
  'WY': 0.04
};

const stateNames = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

const BillSplitter = () => {
  const [preTaxAmount, setPreTaxAmount] = useState('');
  const [splitWays, setSplitWays] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [result, setResult] = useState(0);
  const [userState, setUserState] = useState('');
  const [taxRate, setTaxRate] = useState(0);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await response.json();
          const state = data.principalSubdivisionCode.split('-')[1];
          if (state in stateTaxRates) {
            setUserState(state);
            setTaxRate(stateTaxRates[state]);
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      }, (error) => {
        console.error("Error getting geolocation:", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleStateChange = (state) => {
    setUserState(state);
    setTaxRate(stateTaxRates[state]);
  };

  const calculateSplit = () => {
    const amount = parseFloat(preTaxAmount);
    const people = parseInt(splitWays);
    const tip = tipPercentage === 'custom' ? parseFloat(customTip) : tipPercentage;
    
    if (isNaN(amount) || isNaN(people) || people <= 0 || isNaN(tip)) {
      setResult(0);
      return;
    }

    const totalWithTax = amount * (1 + taxRate);
    const totalWithTip = totalWithTax + ( (tip/100) * amount);
    const perPerson = totalWithTip / people;

    setResult(perPerson.toFixed(2));
  };

  useEffect(() => {
    calculateSplit();
  }, [preTaxAmount, splitWays, tipPercentage, customTip, taxRate]);

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl text-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-white">Simple Bill Splitter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Pre-Tax Amount</label>
          <Input
            type="number"
            value={preTaxAmount}
            onChange={(e) => setPreTaxAmount(e.target.value)}
            placeholder="$0.00"
            className="bg-white/10 border-white/20 placeholder:text-white/50 focus:bg-white/20 focus:ring-white/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Number of Ways to Split</label>
          <Input
            type="number"
            value={splitWays}
            onChange={(e) => setSplitWays(e.target.value)}
            placeholder="Enter number of people"
            className="bg-white/10 border-white/20 placeholder:text-white/50 focus:bg-white/20 focus:ring-white/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">State</label>
          <Select value={userState} onValueChange={handleStateChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white/90">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent className="backdrop-blur-2xl bg-black/60 border-white/20 text-white">
              {Object.entries(stateNames).sort((a, b) => a[1].localeCompare(b[1])).map(([code, name]) => (
                <SelectItem key={code} value={code} className="focus:bg-white/20">{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Tip Percentage</label>
          <ToggleGroup 
            type="single" 
            value={String(tipPercentage)}
            onValueChange={(value) => {
              if (value) {
                if (value === 'custom') {
                  setTipPercentage('custom');
                } else {
                  setTipPercentage(parseFloat(value));
                }
              }
            }}
            className="grid grid-cols-5 gap-2"
          >
            {[15, 18, 20, 25].map((tip) => (
              <ToggleGroupItem key={tip} value={String(tip)} aria-label={`${tip}% tip`} className="bg-white/10 text-white/80 border-white/20 rounded-md hover:bg-white/20 data-[state=on]:bg-white/30 data-[state=on]:text-white transition-colors">
                {tip}%
              </ToggleGroupItem>
            ))}
            <ToggleGroupItem value="custom" aria-label="Custom tip" className="bg-white/10 text-white/80 border-white/20 rounded-md hover:bg-white/20 data-[state=on]:bg-white/30 data-[state=on]:text-white transition-colors">
              Custom
            </ToggleGroupItem>
          </ToggleGroup>
          {tipPercentage === 'custom' && (
            <Input
              type="number"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder="Enter custom tip %"
              className="mt-2 bg-white/10 border-white/20 placeholder:text-white/50 focus:bg-white/20 focus:ring-white/50 transition-colors"
            />
          )}
        </div>
        <div className="text-center pt-4 border-t border-white/20">
          <h3 className="text-lg font-semibold text-white/90">Each Person Owes:</h3>
          <p className="text-4xl font-bold text-white tracking-tight">${result}</p>
          <p className="text-sm mt-2 text-white/70">
            Selected State: {userState ? stateNames[userState] : 'N/A'} | Tax Rate: {(taxRate * 100).toFixed(3)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillSplitter;
