"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Clipboard } from "lucide-react";
import { ClipboardCopy } from "lucide-react";

export const CopyUrlBtn: FC<{ url: string }> = ({ url }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button className="z-50" variant="default" size="default" onClick={copy}>
      {copied ? (
        <>
          <ClipboardCopy className="h-5 w-5 transition-all" />
          <span className="ml-2">Copied!</span>
        </>
      ) : (
        <>
          <Clipboard className="h-5 w-5 transition-all" />
          <span className="ml-2">Copy URL</span>
        </>
      )}
    </Button>
  );
};
