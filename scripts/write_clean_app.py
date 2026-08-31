# Python clean app.js builder
import os

with open("src/frontend/public/js/app.js", "w", encoding="utf-8") as f:
    f.write("// OmniCustomer 360 - Frontend SPA\n")

print("clean app.js initialized")
