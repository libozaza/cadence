import pandas as pd
import joblib

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 1. Load dataset
df = # File Path

# 2. Features (columns 2–7) and target (column 8)
X = df.iloc[:, 1:7]
y = df.iloc[:, 7].astype(int)

# 3. Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 4. Pipeline (scaling + SVM)
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("svm", SVC(class_weight="balanced", probability=True))
])

# 5. Grid search (find best balanced model)
param_grid = {
    "svm__kernel": ["linear", "rbf"],
    "svm__C": [0.1, 0.5, 1, 2, 5, 10],
    "svm__gamma": ["scale", "auto"]
}

grid = GridSearchCV(
    pipeline,
    param_grid,
    scoring="f1_macro",
    cv=5
)

grid.fit(X_train, y_train)

print("Best settings:", grid.best_params_)
print("Best CV score:", grid.best_score_)

# 6. Use best model
best_model = grid.best_estimator_

# 7. Predict
y_pred = best_model.predict(X_test)

# 8. Evaluate
print("\nAccuracy:", accuracy_score(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred, zero_division=0))

# 9. SAVE (download) model + scaler
joblib.dump(best_model, r"../svm_model.pkl")

print("\nModel saved to: ../svm_model.pkl")
