import os
import pandas as pd

csv_path = # Path
txt_folder = # Path
output_path = # Path

parkinsons_map = {}

for file in os.listdir(txt_folder):
    if file.endswith(".txt"):
        user_id = file.split("_")[-1].replace(".txt", "").strip()

        file_path = os.path.join(txt_folder, file)

        with open(file_path, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("Parkinsons"):
                    value = line.split(":", 1)[1].strip()
                    parkinsons_map[user_id] = value
                    break

df = pd.read_csv(csv_path)

df["ID_Tag"] = df["ID_Tag"].astype(str).str.strip()


df["Parkinsons"] = df["ID_Tag"].map(parkinsons_map)

df["Parkinsons"] = df["Parkinsons"].map(
    lambda x: True if x == "True" else False if x == "False" else None
)

df.to_csv(output_path, index=False)

print("Done.")
print(df[["ID_Tag", "Parkinsons"]].head())
