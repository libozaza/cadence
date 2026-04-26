import pandas as pd
import glob
import os

folder_path = // Insert Path
# Indices for columns 5, 7, and 8 are 4, 6, and 7
target_cols = [4, 6, 7]
results = []

search_path = os.path.join(folder_path, "*.txt")

for file_path in glob.glob(search_path):
    try:
        file_id = os.path.basename(file_path)[:10]
        
        # Using sep='\t' because your example shows clear tab separation
        df = pd.read_csv(file_path, sep='\t', header=None, engine='python')
        
        # Ensure we only look at the columns we need
        subset = df.iloc[:, target_cols]
        
        # Force to numeric (this handles the 0066.4 format correctly)
        subset = subset.apply(pd.to_numeric, errors='coerce')
        
        # Drop empty rows
        subset = subset.dropna()
        
        # Calculate Mean and Std
        means = subset.mean().tolist()
        stds = subset.std().tolist()
        
        # Final row: [ID, M5, M7, M8, S5, S7, S8]
        results.append([file_id] + means + stds)
        
    except Exception as e:
        print(f"Skipping {os.path.basename(file_path)}: {e}")

# Create the summary table
columns = ['ID_Tag', 'Hold_time_5', 'Latency_time_7', 'Flight_time_8', 'Hold_time_5', 'Latency_time_7', 'Flight_time_8']
summary_df = pd.DataFrame(results, columns=columns)

# Save to the folder
output_path = os.path.join(folder_path, "summary_results.csv")
summary_df.to_csv(output_path, index=False)

print(f"Successfully processed {len(results)} files.")
print(f"File saved to: {output_path}")

