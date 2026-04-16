const data = {
  "banner": "https://alsabahcandies.com/Materials/loop_banner_alsabah.mp4",
  "banner_poster": "https://alsabahcandies.com/Materials/loop_banner_alsabah00.jpg",
  "products": [
    {
      "id": "1",
      "name": "حليب محشوة بالشوكولا",
      "description": "سكاكر بطبقة خارجية من الحليب كامل الدسم مع حشوة شوكولا غنية في الداخل، تجمع بين النعومة والطعم المركز في حبة واحدة.",
      "image": "https://alsabahcandies.com/products/محشية-شوكولاnew.png"
    },
    {
      "id": "2",
      "name": "محشية بكريمة البندق",
      "description": "سكاكر محشية بكريمة البندق الناعمة، بنكهة متوازنة وغنية مناسبة لمحبي الطعم الكلاسيكي الفاخر.",
      "image": "https://alsabahcandies.com/products/محشي-كريم-البندق.png"
    },
    {
      "id": "3",
      "name": "قهوة بالحليب",
      "description": "سكاكر بطعم القهوة الممزوجة بالحليب تمنح مذاقاً دافئاً يناسب أوقات الاستراحة.",
      "image": "https://alsabahcandies.com/products/قهوة-بالحليب.png"
    },
    {
      "id": "4",
      "name": "بطعم الليمون والنعناع",
      "description": "سكاكر منعشة بنكهة النعناع والليمون معاً توفر انتعاشاً فورياً وطعماً نقياً يدوم.",
      "image": "https://alsabahcandies.com/products/ليمون-ونعنع.png"
    },
    {
      "id": "5",
      "name": "توفي فواكه",
      "description": "حبات توفي طرية بنكهات فواكه متنوعة مثل البطيخ الأصفر، الكرز، الليمون، الموز، البرتقال والتفاح، قوامها طري ونكهتها غنية بطعم الفاكهة.",
      "image": "https://alsabahcandies.com/products/توفي-الفواكهnew.png"
    },
    {
      "id": "6",
      "name": "كاندي حوامض",
      "description": "سكاكر بنكهات حامضة متنوعة مثل كولا، ليمون، تفاح، برتقال، فريز، موز، مخصصة لمحبي النكهات الجريئة والمنعشة.",
      "image": "https://alsabahcandies.com/products/كاندي-حوامض.png"
    },
    {
      "id": "7",
      "name": "كاندي نعناع",
      "description": "حبيبات صغيرة بنكهة النعناع المركز لعشاق مذاق النعنع ولمحبين الانتعاش.",
      "image": "https://alsabahcandies.com/products/كاندي-نعنع.png"
    },
    {
      "id": "8",
      "name": "كراميل شوكولا",
      "description": "قطع كراميل غنية بنكهة الشوكولا اللذيذة تجمع بين القوام الطري والطعم الغني.",
      "image": "https://alsabahcandies.com/products/كراميل-شوكولا.png"
    },
    {
      "id": "9",
      "name": "كوكتيل فواكه",
      "description": "مجموعة من نكهات الفواكه الطبيعية في كيس سكاكر واحد، خيار مناسب للتنوع والاستمتاع بنكهات مختلفة كل مرة.",
      "image": "https://alsabahcandies.com/products/كوكتيل-الفواكه.png"
    },
    {
      "id": "10",
      "name": "حليب",
      "description": "سكاكر بالحليب الكامل الدسم بطعم وملمس يذوب في الفم، تُعد خياراً مثالياً لعشاق النكهات الكلاسيكية الهادئة.",
      "image": "https://alsabahcandies.com/products/بالحليب.png"
    },
    {
      "id": "11",
      "name": "كراميل حليب",
      "description": "كراميل لذيذ بطعم الحليب كامل الدسم، بسيط وأصيل.",
      "image": "https://alsabahcandies.com/products/كراميل-الحليب.png"
    },
    {
      "id": "12",
      "name": "آيس كريم",
      "description": "سكاكر لذيذة المذاق بنكهات مستوحاة من الآيس كريم، متوفرة بنكهات الفريز، الأناناس والبطيخ الأصفر.",
      "image": "https://alsabahcandies.com/products/أيس-كريم.png"
    }
  ],
  "other_products": [
    {
      "id": "o1",
      "name": "سكاكر الشوكولا الفاخرة",
      "description": "غنية بالحليب .. محشوة شوكولا",
      "image_url": "https://alsabahcandies.com/products/علبة-شوكولا.png",
      "weight": "500g"
    }
  ],
  "sections": {
    "about": {
      "title": "أصالة المذاق منذ 1947",
      "subtitle": "قصتنا",
      "description": "بدأت رحلتنا في قلب دمشق، حيث الشغف بصناعة السكاكر والحلويات. على مدار عقود، حافظنا على الوصفات التقليدية مع دمج أحدث التقنيات لنقدم لكم مذاقاً لا يُنسى يجمع بين الماضي والحاضر.",
      "image_url": "https://alsabahcandies.com/Materials/post-new.png"
    }
  }
};

function encodeUrl(url) {
  if (!url.startsWith('http')) return url;
  const urlParts = url.split('/');
  const filename = urlParts.pop();
  return urlParts.join('/') + '/' + encodeURIComponent(filename);
}

data.products.forEach(p => {
  p.image = encodeUrl(p.image);
});

data.other_products.forEach(p => {
  p.image_url = encodeUrl(p.image_url);
});

console.log(JSON.stringify(data, null, 2));
