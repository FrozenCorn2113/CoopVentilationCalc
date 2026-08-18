'use client'

import * as React from 'react'
import type { CalculatorInputs as Inputs } from '@/lib/formulas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Controlled form. Emits onSubmit(inputs) on button click — never on change
// Deliberately no live-update: results recalculate on submit, not on keystroke.
// Fields are declared here rather than inferred, so the form stays typed.
//
// Composed from shadcn primitives (Input, Label, Select, Button) so theme
// tokens flow from app/globals.css. Hugo overrides those tokens via DESIGN.md.

export function CalculatorInputs({
  onSubmit,
  disabled,
}: {
  onSubmit: (inputs: Inputs) => void
  disabled?: boolean
}) {
  const [floorSqFt, setFloorSqFt] = React.useState('')
  const [flockSize, setFlockSize] = React.useState('')
  const [climateZone, setClimateZone] = React.useState('temperate')

  function handle(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      floorSqFt: Number(floorSqFt) || 0,
      flockSize: Number(flockSize) || 0,
      climateZone,
    })
  }

  return (
    <form onSubmit={handle} className="space-y-5 max-w-md">
      <div className="space-y-1.5">
        <Label htmlFor="calc-floor-sqft">Floor area (sq ft)</Label>
        <Input
          id="calc-floor-sqft"
          type="number"
          inputMode="numeric"
          value={floorSqFt}
          onChange={(e) => setFloorSqFt(e.target.value)}
          required
          min={1}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="calc-flock-size">Flock size</Label>
        <Input
          id="calc-flock-size"
          type="number"
          inputMode="numeric"
          value={flockSize}
          onChange={(e) => setFlockSize(e.target.value)}
          required
          min={1}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="calc-climate">Climate</Label>
        <Select
          value={climateZone}
          onValueChange={(v) => setClimateZone(v ?? 'temperate')}
        >
          <SelectTrigger id="calc-climate">
            <SelectValue placeholder="Select climate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cold-winter">Cold winter</SelectItem>
            <SelectItem value="mild-winter">Mild winter</SelectItem>
            <SelectItem value="temperate">Temperate</SelectItem>
            <SelectItem value="hot-summer">Hot summer</SelectItem>
            <SelectItem value="humid-coastal">Humid coastal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={disabled}>
        Calculate
      </Button>
    </form>
  )
}
