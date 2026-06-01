import re

with open('C:/Users/asus2/frontend/app/products/[slug]/ProductPageClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('src="/product-galery/6.jpg"', 'src={product.imageSection2 || "/product-galery/6.jpg"}')
content = content.replace('src="/product-galery/4.jpg"', 'src={product.imageSection4 || "/product-galery/4.jpg"}')
content = content.replace('src="/product-galery/promise-packaging.jpg"', 'src={product.imagePromisePackaging || "/product-galery/promise-packaging.jpg"}')
content = content.replace('src="/product-galery/promise-delivery.jpg"', 'src={product.imagePromiseDelivery || "/product-galery/promise-delivery.jpg"}')
content = content.replace('src="/product-galery/promise-cod.jpg"', 'src={product.imagePromiseCod || "/product-galery/promise-cod.jpg"}')
content = content.replace('src="/product-galery/5.jpg"', 'src={product.imageRitual || "/product-galery/5.jpg"}')

with open('C:/Users/asus2/frontend/app/products/[slug]/ProductPageClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
