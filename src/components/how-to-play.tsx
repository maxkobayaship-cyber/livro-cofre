"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { copy } from "@/lib/copy";

export function HowToPlay() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="font-heading text-[color:var(--gold)] hover:bg-[#e8c547]/10 hover:text-[#f3d56a]"
        >
          {copy.howTo}
        </Button>
      </DialogTrigger>
      <DialogContent className="border-[#c9a227]/40 bg-[#1c140e] text-[#f4ead8] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl tracking-wide text-[#e8c547]">
            {copy.howToTitle}
          </DialogTitle>
          <DialogDescription className="space-y-3 text-base leading-relaxed text-[#d9cbb3]">
            {copy.howToBody.map((paragraph) => (
              <span key={paragraph} className="block">
                {paragraph}
              </span>
            ))}
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#e8c547]" />
            {copy.legendCorrect}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#d9853b]" />
            {copy.legendPresent}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#6a645c]" />
            {copy.legendAbsent}
          </li>
        </ul>
        <DialogFooter className="border-[#c9a227]/20 bg-transparent">
          <DialogClose asChild>
            <Button className="bg-[#c9a227] text-[#1a120c] hover:bg-[#e8c547]">
              {copy.closeHowTo}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
