import re

with open('content/categories.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_category = """  {
    slug: "womens-health",
    nameAr: "دعم صحة الأنثى",
    shortNameAr: "صحة الأنثى",
    concernAr: "مرافقة صحة الأنثى",
    descriptionAr:
      "مزيج عشبي دافئ لمرافقة صحة المرأة ودعم الخصوبة، ضمن نمط حياة متوازن.",
    imageTheme: "womens-health",
    image: "/categories/cat-womens-health.jpg",
    productSlugs: ["fertility-tea"],
  },
];"""

content = content.replace("];\n\nexport function getCategoryBySlug", new_category + "\n\nexport function getCategoryBySlug")

with open('content/categories.ts', 'w', encoding='utf-8') as f:
    f.write(content)
