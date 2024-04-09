ENV-INFO
COINMARKETCAP_API_KEY=0a794595-fb8c-461c-84f1-50433b7a8052

# {SCICHART LICENSE LICENSE}

LICENSE_KEY=eBa35A+HZv+qvOVFtBmDmE432TXQeAvqSBHnf2qTTYh1RpcOzEXvvsAWDK2wmufFLOV65OEulZhr12Z4XurdfSDBw9aY8uUp8VGu/dTw8oPqPmhO2BUfaP9G/NDvjzoAtVsvddWc7pblOUWWJRLFnXy6V0oAPrNFbYjcCIpcDR+s0OD56aeETczJXU9L6DokC5H2unxvGggulkhzjotcLpPezBF8rtwZNrBvX8+4NOK5fRPaxOYNFrHqWR6VDfh6NuDsSlLOPb0peTNl2k3GiRPfgY1PulN61qZODsi0RTeRM0EC1pmhQ7y8rFyQ0ckWLRAocGHUWH9qFs2UYVjI647FMtbyGi3TPLkAi7vKFuakqccdiwaMCdqHP1p6M1ryr86siGBARxRuLIeEG2Yl2okfRaOrwyEoo8Xf6GdArutb3ijDcaGvCI2Xkeo8GESWqzbwtGnMlyaXUvN7JFAw8ETM9vC2O7Zfido4gXKPZXFvD6ukACO3V38wj0+YWIED0GSRye6cmijramKSvG4jVsG5sKp9k07oxUcTfn11IVj7xa4gG1KuPE3NbkLVyPEPmAX5zr8eY42vZP3/K4vaLa49l7fdWbgaJ/ULuPMhxAJGb36pL6xESvnSUbvwqxnek3eO4/9slnkv4NCmYYZw7VvVFFu06TFUo+IDqL1/t4+vGO3YhQ==

1. Landing გვერდზე გვაქვს antd თეიბლი ქოინის დასახელებას რომ დავაჭერთ გადავდივართ თითოეული ქოინის ინფორმაციაზე / Scichart ვიყენებ სოკეტებს ლაივ ინფორმაციისათვის მოდიფიცირება შესაძლებელია კოდიდან. დანარჩენი ინფორმაცია მოდის coinmarkecap API-დან / binance api და სოკეტების გარეშე coinmarket-ის API ნელა აფთდეითდება და სასურველი შედეგი არ გვაქვს სამწუხაროდ. დოკებს გადავხედე და უფასო api (historical) ფასებს არ ასაპორტებს მაგალითად რეინჯი რომ წამოგვეღო 7 დღის 1 თვის და ა.შ.
2. სქაიჩართზე დამჭირდა scss შემოგდება რაღაცეებს გლობალურად სჭირდებოდა სტილები / ვიყენებ tailwind.
3. ბიბლიოთეკას რაც შეეხება antd და ტრემორს ვიყენებ / დოკიდან გამომდინარე რომ ეწერა ავიღე თეიბლი უბრალოდ ანტდ-დან.
4. ანიმაციებისთვის framermotion / three.js
5. zustand სთეით მენეჯმეტისთვის.
6. კონვერტაციის მხარე coinmarket-api-დან ითვლის ყველა კალკულაციას, ვიზუალისთვის ვეცადე მიახლოვებული ყოფიყო https://coinmarketcap.com/converter/

7. https://www.scichart.com/javascript-chart-features/, https://www.scichart.com/documentation/js/current/StartHere-AxisOverview.html ეს არის ჩართ ბიბლიოთეკა support აქვს javascript / რეაქთ, ნექსთზე ცოტა პრობლემები ქონდა .wasm ფაილებს ბილდზე სტატიკ ფაილებს არ კითხულობდა ნორმალურად ოდნავ გამაწვალა კარგი დოკ რომ არ ედოთ ბაგებისთვის :joy: მოკლედ next კონფიგშია ყველა ბილდ ინფორმაცია. trial-ია პატარ პატარა warning error რაღაცეებში მაინც აქვს სოკეტებზე და ჩართზე მაგრამ საბოლოოდ მაინც 90% გამართულად მუშაობს.
