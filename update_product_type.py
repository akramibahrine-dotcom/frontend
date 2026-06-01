import re

with open('C:/Users/asus2/frontend/content/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add optional image fields to Product type
type_addition = """  images: string[];
  imageSection2?: string;
  imageSection4?: string;
  imagePromisePackaging?: string;
  imagePromiseDelivery?: string;
  imagePromiseCod?: string;
  imageRitual?: string;"""

content = content.replace("  images: string[];", type_addition)

# Add the specific images to fertility-tea product
fertility_tea_addition = """    images: ["/products/fertility-tea/1.jpg", "/products/fertility-tea/2.jpg", "/products/fertility-tea/3.jpg"],
    imageSection2: "/products/fertility-tea/section2.jpg",
    imageSection4: "/products/fertility-tea/section4.jpg",
    imagePromisePackaging: "/products/fertility-tea/promise-packaging.jpg",
    imagePromiseDelivery: "/products/fertility-tea/promise-delivery.jpg",
    imagePromiseCod: "/products/fertility-tea/promise-cod.jpg",
    imageRitual: "/products/fertility-tea/ritual.jpg","""

content = content.replace('    images: ["/products/fertility-tea/1.jpg", "/products/fertility-tea/2.jpg", "/products/fertility-tea/3.jpg"],', fertility_tea_addition)

with open('C:/Users/asus2/frontend/content/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)
