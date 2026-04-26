import { X } from 'lucide-react';

export function ExportModal() {
  return (
    <div className="w-full h-full bg-background/95 backdrop-blur-sm flex items-center justify-center p-12">
      <div className="bg-card rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border">
          <h2>Report Preview</h2>
          <button className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Document Preview */}
        <div className="p-12 overflow-auto max-h-[calc(80vh-80px)]">
          <div className="bg-white border border-border rounded-2xl p-12 shadow-sm">
            {/* Report Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-sm bg-accent" />
                </div>
                <div>
                  <h3 className="text-foreground">Cadence</h3>
                  <p className="text-sm text-muted-foreground">Typing Pattern Report</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Generated</p>
                <p className="text-foreground">April 25, 2026</p>
              </div>
            </div>

            {/* Report Period */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-1">Reporting Period</p>
              <p className="text-foreground">January 25, 2026 – April 25, 2026 (90 days)</p>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h4 className="mb-3">Summary</h4>
              <p className="text-muted-foreground leading-relaxed">
                This report presents an analysis of typing pattern data collected over a 90-day period.
                The analysis focuses on keystroke dynamics including hold time (dwell time), inter-key
                latency (flight time), typing rhythm consistency, and bilateral symmetry. The observed
                patterns fall within typical ranges for healthy adults and show no significant deviations
                that would warrant clinical concern at this time.
              </p>
            </div>

            {/* Data Table */}
            <div className="mb-8">
              <h4 className="mb-4">Key Metrics</h4>
              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm text-foreground">Metric</th>
                      <th className="text-left px-4 py-3 text-sm text-foreground">Value</th>
                      <th className="text-left px-4 py-3 text-sm text-foreground">Typical Range</th>
                      <th className="text-left px-4 py-3 text-sm text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-sm text-foreground">Hold Time (avg)</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">81 ms</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">70–90 ms</td>
                      <td className="px-4 py-3">
                        <span className="text-sm px-3 py-1 rounded-full bg-success/20 text-success">
                          Normal
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-foreground">Inter-Key Latency (avg)</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">145 ms</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">120–160 ms</td>
                      <td className="px-4 py-3">
                        <span className="text-sm px-3 py-1 rounded-full bg-success/20 text-success">
                          Normal
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-foreground">Hold Time Variability</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">8% deviation</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">&lt;15%</td>
                      <td className="px-4 py-3">
                        <span className="text-sm px-3 py-1 rounded-full bg-success/20 text-success">
                          Normal
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-foreground">Left-Right Asymmetry</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">12% difference</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">&lt;20%</td>
                      <td className="px-4 py-3">
                        <span className="text-sm px-3 py-1 rounded-full bg-success/20 text-success">
                          Normal
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-foreground">Rhythm Consistency</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">90% stable</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">&gt;85%</td>
                      <td className="px-4 py-3">
                        <span className="text-sm px-3 py-1 rounded-full bg-success/20 text-success">
                          Normal
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Overall Score */}
            <div className="mb-8 p-6 bg-muted/30 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Motor Pattern Deviation Score</p>
                  <p className="text-3xl text-foreground">12%</p>
                </div>
                <div className="text-right">
                  <span className="text-sm px-4 py-2 rounded-full bg-success/20 text-success">
                    Within typical range
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Important Notice:</strong> This report is generated
                by Cadence software and is intended solely as supplementary information for your healthcare
                provider. This is not a medical diagnosis, screening tool, or substitute for professional
                medical evaluation. Cadence monitors typing patterns and cannot diagnose Parkinson's disease
                or any other medical condition. Please share this report with a qualified healthcare provider
                for proper medical interpretation and guidance.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <p>Cadence v1.0 • Report ID: CDN-2026-04-25-8F3A</p>
              <p>Page 1 of 1</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-border flex items-center justify-end gap-3">
          <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl hover:bg-muted transition-colors">
            Cancel
          </button>
          <button className="px-6 py-3 bg-accent text-accent-foreground rounded-2xl hover:opacity-90 transition-opacity">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
