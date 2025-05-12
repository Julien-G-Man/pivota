
import { useState } from 'react';
import { Share2, Download, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionType } from '@/components/transactions/TransactionItem';
import { useToast } from '@/hooks/use-toast';

interface TransactionReceiptProps {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  currency: string;
  date: Date;
  status?: 'completed' | 'pending' | 'failed';
  recipientId?: string;
  reference?: string;
  onClose?: () => void;
}

export default function TransactionReceipt({
  id,
  type,
  title,
  subtitle,
  amount,
  currency,
  date,
  status = 'completed',
  recipientId = '12345678',
  reference = 'TRX-PIVOTA-',
  onClose
}: TransactionReceiptProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Generate a formatted reference number
  const referenceNumber = `${reference}${id.substring(0, 8).toUpperCase()}`;
  
  const formattedAmount = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(date);
  
  const handleShare = async () => {
    // Format receipt text for sharing
    const receiptText = `
Pivota Transaction Receipt
-----------------------
Transaction ID: ${referenceNumber}
Date: ${formattedDate}
Type: ${type.charAt(0).toUpperCase() + type.slice(1)}
${type === 'send' ? 'Recipient' : 'Sender'}: ${title}
Amount: ${formattedAmount} ${currency}
Status: ${status.charAt(0).toUpperCase() + status.slice(1)}
    `;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Pivota Transaction Receipt',
          text: receiptText
        });
        
        toast({
          title: "Receipt Shared",
          description: "Your transaction receipt has been shared successfully."
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(receiptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        toast({
          title: "Receipt Copied",
          description: "Your transaction receipt has been copied to clipboard."
        });
      }
    } catch (error) {
      console.error('Error sharing receipt:', error);
      toast({
        title: "Sharing Failed",
        description: "Could not share the receipt. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF receipt
    toast({
      title: "Receipt Downloaded",
      description: "Your transaction receipt has been downloaded."
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <CardTitle className="text-center flex flex-col items-center">
          <div className="font-bold text-xl mb-2">Transaction Receipt</div>
          <div className="text-sm font-normal">
            {status === 'completed' ? 'Transaction Successful' : status === 'pending' ? 'Transaction Pending' : 'Transaction Failed'}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 py-4 space-y-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold">{formattedAmount} {currency}</div>
          <div className="text-sm text-muted-foreground">
            {type === 'send' ? 'Sent to' : type === 'receive' ? 'Received from' : type === 'bill' ? 'Paid to' : 'Purchased'}
            {': '}{title}
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Transaction Type</span>
            <span className="font-medium capitalize">{type}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Reference</span>
            <div className="flex items-center">
              <span className="font-medium mr-2">{referenceNumber}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(referenceNumber);
                  toast({
                    title: "Copied",
                    description: "Reference number copied to clipboard"
                  });
                }}
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Status</span>
            <span className={`font-medium ${
              status === 'completed' ? 'text-green-500' :
              status === 'pending' ? 'text-amber-500' : 'text-red-500'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Description</span>
            <span className="font-medium">{subtitle}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 flex justify-between">
        <Button variant="outline" onClick={handleDownload} className="flex-1 mr-2">
          <Download size={16} className="mr-2" />
          Download
        </Button>
        
        <Button onClick={handleShare} className="flex-1">
          {copied ? <Check size={16} className="mr-2" /> : <Share2 size={16} className="mr-2" />}
          {copied ? 'Copied!' : 'Share'}
        </Button>
      </CardFooter>
    </Card>
  );
}
