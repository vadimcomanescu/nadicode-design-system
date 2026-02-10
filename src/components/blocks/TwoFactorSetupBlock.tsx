import * as React from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { Checkbox } from "../ui/Checkbox"
import { Label } from "../ui/Label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/InputOTP"
import { FormWizard, type WizardStep } from "../ui/FormWizard"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/Collapsible"
import { ShieldIcon } from "../ui/icons/shield"
import { CopyIcon } from "../ui/icons/copy"
import { StaggerChildren } from "../ui/StaggerChildren"
import { scaleIn } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface TwoFactorSetupBlockProps {
  className?: string
  qrCodeUrl?: string
  secret?: string
  backupCodes?: string[]
  onVerify?: (code: string) => void
  onComplete?: () => void
}

const DEFAULT_BACKUP_CODES = [
  "a1b2-c3d4", "e5f6-g7h8", "i9j0-k1l2", "m3n4-o5p6",
  "q7r8-s9t0", "u1v2-w3x4", "y5z6-a7b8", "c9d0-e1f2",
]

export function TwoFactorSetupBlock({
  className,
  qrCodeUrl,
  secret = "JBSWY3DPEHPK3PXP",
  backupCodes = DEFAULT_BACKUP_CODES,
  onVerify,
  onComplete,
}: TwoFactorSetupBlockProps) {
  const [otpCode, setOtpCode] = React.useState("")
  const [verified, setVerified] = React.useState(false)
  const [savedCodes, setSavedCodes] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyAllCodes = () => {
    copyToClipboard(backupCodes.join("\n"))
  }

  const downloadCodes = () => {
    const blob = new Blob([backupCodes.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "backup-codes.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleVerify = (value: string) => {
    setOtpCode(value)
    if (value.length === 6) {
      onVerify?.(value)
      setVerified(true)
    }
  }

  const steps: WizardStep[] = [
    {
      id: "scan",
      title: "Scan QR code",
      content: (
        <div className="space-y-4">
          <div className="flex justify-center">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code" className="h-48 w-48 rounded-lg border border-border" />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface">
                <span className="text-sm text-text-tertiary">QR Code</span>
              </div>
            )}
          </div>

          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full text-text-tertiary">
                Can't scan? Enter code manually
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-surface p-3">
                <code className="flex-1 text-sm font-mono text-text-primary break-all">
                  {secret}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(secret)}
                >
                  <CopyIcon size={14} />
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ),
    },
    {
      id: "verify",
      title: "Verify code",
      content: (
        <div className="space-y-4 text-center">
          <p className="text-sm text-text-secondary">
            Enter the 6-digit code from your authenticator app
          </p>
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otpCode} onChange={handleVerify}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {verified && (
            <p className="text-sm text-success">Code verified successfully</p>
          )}
        </div>
      ),
      validate: () => verified,
    },
    {
      id: "backup",
      title: "Save backup codes",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Save these backup codes in a secure location. Each code can only be used once.
          </p>

          <StaggerChildren staggerMs={40} className="grid grid-cols-2 gap-2">
            {backupCodes.map((code) => (
              <Badge key={code} variant="outline" className="justify-center font-mono text-xs py-1.5">
                {code}
              </Badge>
            ))}
          </StaggerChildren>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={copyAllCodes}>
              <CopyIcon size={14} className="mr-2" />
              {copied ? "Copied!" : "Copy all"}
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={downloadCodes}>
              Download
            </Button>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="saved-codes"
              checked={savedCodes}
              onCheckedChange={(v) => setSavedCodes(v === true)}
            />
            <Label htmlFor="saved-codes" className="text-sm">
              I have saved my backup codes
            </Label>
          </div>
        </div>
      ),
      validate: () => savedCodes,
    },
  ]

  return (
    <motion.div {...scaleIn} className={cn("w-full max-w-lg mx-auto", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShieldIcon size={32} className="text-text-secondary" />
            <div>
              <CardTitle className="text-xl">Set up two-factor authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FormWizard
            steps={steps}
            onComplete={onComplete}
            completeLabel="Done"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
