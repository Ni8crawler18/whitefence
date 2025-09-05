"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileSpreadsheet, AlertTriangle, Shield, TrendingUp } from "lucide-react"

const mockResults = [
  {
    clientId: "105",
    anomaly: "Unusual trading volume (5x avg)",
    riskLevel: "High Risk",
    riskColor: "destructive" as const,
    details: "Volume spike detected in last 3 trading sessions",
  },
  {
    clientId: "212",
    anomaly: "Concentrated trades in penny stock",
    riskLevel: "Medium Risk",
    riskColor: "secondary" as const,
    details: "80% of portfolio concentrated in single penny stock",
  },
  {
    clientId: "334",
    anomaly: "Repeated exposure breaches",
    riskLevel: "High Risk",
    riskColor: "destructive" as const,
    details: "Multiple instances of exceeding position limits",
  },
]

export function SurveillanceUpload() {
  const [isUploaded, setIsUploaded] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = () => {
    setIsUploading(true)
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setIsUploaded(true)
    }, 2000)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileUpload()
  }

  const resetUpload = () => {
    setIsUploaded(false)
    setIsUploading(false)
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>Upload Trading Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isUploaded ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <FileSpreadsheet className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {isUploading ? "Processing..." : "Drop your trading files here"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Supports CSV and Excel files with trade data</p>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={handleFileUpload}
                    disabled={isUploading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isUploading ? "Uploading..." : "Choose File"}
                  </Button>
                  <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Analysis Complete</p>
                    <p className="text-sm text-muted-foreground">Trading data processed successfully</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={resetUpload}>
                  Upload New File
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {isUploaded && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Surveillance Results</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                3 Anomalies Detected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-sm font-medium">High Risk</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">2</p>
                  <p className="text-xs text-muted-foreground">Clients flagged</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="text-sm font-medium">Medium Risk</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">1</p>
                  <p className="text-xs text-muted-foreground">Client flagged</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium">Total Reviewed</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">1,247</p>
                  <p className="text-xs text-muted-foreground">Trade records</p>
                </div>
              </div>

              {/* Flagged Results Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client ID</TableHead>
                    <TableHead>Anomaly Detected</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockResults.map((result, index) => (
                    <TableRow key={index} className={result.riskLevel === "High Risk" ? "bg-destructive/5" : ""}>
                      <TableCell className="font-medium">{result.clientId}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{result.anomaly}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={result.riskColor} className="text-xs">
                          {result.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{result.details}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          Review Client
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Analysis completed on {new Date().toLocaleDateString()}</p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Export Report
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Generate Alert Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
