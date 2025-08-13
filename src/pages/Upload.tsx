import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload as UploadIcon, 
  FileText, 
  Check, 
  AlertTriangle, 
  Download,
  Eye
} from "lucide-react";

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Simulate CSV parsing with sample data
      const sampleData = [
        { date: "2024-01-15", description: "STARBUCKS COFFEE", amount: "-5.45", category: "Food & Dining" },
        { date: "2024-01-15", description: "SALARY DEPOSIT", amount: "2500.00", category: "Income" },
        { date: "2024-01-14", description: "AMAZON PURCHASE", amount: "-89.99", category: "Shopping" },
        { date: "2024-01-14", description: "NETFLIX SUBSCRIPTION", amount: "-15.99", category: "Entertainment" },
        { date: "2024-01-13", description: "UBER RIDE", amount: "-23.50", category: "Transportation" },
      ];
      
      setPreviewData(sampleData);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded and parsed.`,
      });
    }
  };

  const handleProcessData = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Data processed successfully", 
        description: "Your transactions have been added to your account.",
      });
      
      // Reset form
      setUploadedFile(null);
      setPreviewData([]);
    }, 2000);
  };

  const downloadSampleFile = () => {
    const csvContent = `Date,Description,Amount,Category\n2024-01-15,STARBUCKS COFFEE,-5.45,Food & Dining\n2024-01-15,SALARY DEPOSIT,2500.00,Income\n2024-01-14,AMAZON PURCHASE,-89.99,Shopping`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'sample_transactions.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Sample file downloaded",
      description: "Use this template to format your transaction data.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Import Transactions</h1>
        <p className="text-muted-foreground">
          Upload your bank statements to automatically categorize and analyze transactions
        </p>
      </div>

      {/* Upload Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Instructions</CardTitle>
          <CardDescription>
            Follow these steps to import your transaction data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-sm">Download Sample</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Get our CSV template to see the required format
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-sm">Format Your Data</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Ensure your CSV has Date, Description, Amount, Category columns
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="bg-success text-success-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-sm">Upload & Process</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload your file and review before final import
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={downloadSampleFile}
            className="w-full md:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Sample CSV
          </Button>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Transaction File</CardTitle>
          <CardDescription>
            Supported formats: CSV, JSON (max 10MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <div className="p-4 bg-primary/10 rounded-full">
                <UploadIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">Click to upload file</p>
                <p className="text-sm text-muted-foreground">
                  or drag and drop your CSV/JSON file here
                </p>
              </div>
            </label>
          </div>
          
          {uploadedFile && (
            <div className="mt-4 p-4 bg-secondary/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-success border-success">
                <Check className="w-3 h-3 mr-1" />
                Uploaded
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Preview */}
      {previewData.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Data Preview</CardTitle>
                <CardDescription>
                  Review your data before processing ({previewData.length} transactions found)
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {previewData.slice(0, 5).map((row, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <p className="font-medium">{row.description}</p>
                      <p className="text-muted-foreground">{row.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      {row.category}
                    </Badge>
                    <span className={`font-semibold ${
                      parseFloat(row.amount) > 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      ${Math.abs(parseFloat(row.amount)).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex items-center justify-between p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-semibold text-sm">Review Before Processing</p>
                  <p className="text-xs text-muted-foreground">
                    Make sure all data looks correct. Processing will add these transactions to your account.
                  </p>
                </div>
              </div>
              <Button
                onClick={handleProcessData}
                disabled={isProcessing}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {isProcessing ? "Processing..." : "Process Data"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}