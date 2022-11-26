/*!
 * Galerie-R pro jQuery
 *
 * Copyright Robert Rajs 2017 - 2018
 *
 * Date: 2018-02-13T00:51:01+02:00
 * Modify: 2018-09-14T00:00:02+02:00
 *
 * @selector	očekává základní selektor pro odkazy s vnořenými obrázky galerie
 * @nadpis		podle tohoto selectoru program hledá nejbližší nadpis nad obrázkem
 */
class Galerie_R {

	constructor(selector,nadpis) {
		this.selector = selector;
		this.selectorNadpis = nadpis;
		this.objekt = false;
		this.img = "";
		this.rychlostRozsvitu = 350;
		this.backgroundColor = "rgba(0,0,0,.8)";
		this.odkazySNadpisy = new Array();
		this.ukazatelObjektu;
		this.nasledujiciObjektUkazatel;
		this.predchoziObjektUkazatel;
		this.dialogTyp = "info_ovladani";

		this.zobrazovatInformace = true;
		this.existujiInformace = false;
		this.slideShowZapnuto = false;
		this.klikNaTlacitko = false;
		this.mysSchovana = false;
		this.slideShowVynechat = false;

		this.dialogIkonaInfo = "<svg id='GalerieRIkonaInfoSVG' xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='4em' height='4em' version='1.1' style='shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd' viewBox='0 0 8948.2 8948.2' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><style type='text/css'><![CDATA[.str0GalerieR {stroke:#CCCCCC;stroke-width:142;stroke-miterlimit:22.9256}.galerieRFil0 {fill:#FEFEFE}.galerieRfil1 {fill:white}.galerieRfil2 {fill:black;fill-opacity:0.200000}.GalerieRfil3 {fill:black;fill-opacity:0.400000}]]></style></defs><g id='Layer_x0020_1'><metadata/><g id='InfoButton'><circle class='galerieRFil0 str0GalerieR' cx='4402.8' cy='2643.3' r='572.1'/><polygon class='galerieRFil0 str0GalerieR' points='3618.5,7034.4 5329.9,7034.4 5329.9,6417.9 4974.9,6417.9 4974.9,3575.1 3676.1,3575.1 3676.1,4227.2 3972.5,4227.2 3972.5,6417.9 3618.5,6417.9 '/><path class='galerieRfil1' d='M4474.1 0c-2471,0 -4474.1,2003.1 -4474.1,4474.1 0,2471 2003.1,4474.1 4474.1,4474.1 2471,0 4474.1,-2003.1 4474.1,-4474.1 0,-2471 -2003.1,-4474.1 -4474.1,-4474.1zm-3769.9 4474.1c0,-2082.1 1687.8,-3769.9 3769.9,-3769.9 2082.1,0 3769.9,1687.8 3769.9,3769.9 0,2082.1 -1687.8,3769.9 -3769.9,3769.9 -2082.1,0 -3769.9,-1687.8 -3769.9,-3769.9z'/><path class='galerieRfil2' d='M3101.1 962c-1403.1,548.9 -2396.9,1914.4 -2396.9,3512.1 0,1373 733.9,2574.5 1830.9,3233.7l0 -642.7 516 0 0 -3192.9 -432 0 0 -950.4 1283.9 0c-46,-82.4 -72.2,-177.4 -72.2,-278.5 0,-100 25.7,-194.1 70.8,-275.9 -71.1,19.7 -146,30.3 -223.4,30.3 -460.5,0 -833.8,-373.3 -833.8,-833.8 0,-236.6 98.5,-450.1 256.8,-601.9z'/><path class='galerieRfil2' d='M6270.6 3674.3l0 2193.9 612.2 0 0 475.7 -1907.9 0 0 74 355 0 0 616.4 -818 0 0 30.7 517.4 0 0 898.4 -1984.8 0c440.8,180.8 923.5,280.5 1429.5,280.5 2082.1,0 3769.9,-1687.8 3769.9,-3769.9 0,-2082.1 -1687.8,-3769.9 -3769.9,-3769.9 -205.6,0 -407.3,16.5 -603.9,48.1 367.9,86.7 641.8,417.2 641.8,811.6 0,192.6 -65.3,369.9 -175,511.1 21.6,-2.5 43.6,-3.7 65.8,-3.7 279.7,0 512.6,200.8 562.3,466.1 100.1,-15.3 207.4,-23.6 319.1,-23.6 544.8,0 986.4,197.7 986.4,441.5 0,243.8 -441.7,441.5 -986.4,441.5 -312.8,0 -591.5,-65.2 -772.2,-166.8l0 345.1 462.9 0 0 99.2 1295.7 0z'/><path class='GalerieRfil3' d='M3972.5 6417.9l0 -2190.8 -296.4 0 0 -652.1 835.8 0 0 -345.1c180.7,101.6 459.5,166.8 772.2,166.8 544.8,0 986.4,-197.7 986.4,-441.5 0,-243.8 -441.7,-441.5 -986.4,-441.5 -111.7,0 -219,8.3 -319.1,23.6 6.4,34.3 9.8,69.8 9.8,106 0,316 -256.1,572.1 -572.1,572.1 -214.9,0 -402.1,-118.5 -499.9,-293.6l-1283.9 0 0 950.4 432 0 0 3192.9 -516 0 0 642.7c162.3,97.5 332.6,183.2 509.5,255.8l1984.8 0 0 -898.4 -517.4 0 0 -30.7 -893.5 0 0 -616.4 354 0z'/><polygon class='GalerieRfil3' points='4974.9,3674.3 4974.9,6343.9 6882.8,6343.9 6882.8,5868.2 6270.6,5868.2 6270.6,3674.3 '/><path class='GalerieRfil3' d='M3901.5 2367.4c87.4,-158.4 247.6,-270.9 435.5,-292.5 109.7,-141.2 175,-318.5 175,-511.1 0,-394.4 -273.9,-724.9 -641.8,-811.6 -266.7,42.9 -524.1,113.9 -769,209.7 -158.3,151.8 -256.8,365.3 -256.8,601.9 0,460.5 373.3,833.8 833.8,833.8 77.4,0 152.3,-10.5 223.4,-30.3z'/></g></g></svg>";
		this.dialogIkonaSlideshow = "<svg id='GalerieRIkonaSlideshowSVG' xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='4em' height='4em' version='1.1' style='shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd' viewBox='0 0 7822.9 7822.9' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><style type='text/css'><![CDATA[.str0GalerieR {stroke:#B0B0B0;stroke-width:124.1;stroke-miterlimit:22.9256;stroke-opacity:0.200000}.galerieRfil1 {fill:#FEFEFE}.galerieRFil0 {fill:white}.galerieRfil2 {fill:white;fill-opacity:0.200000}.GalerieRfil3 {fill:black;fill-opacity:0.400000}.galerieRfil4 {fill:black;fill-opacity:0.600000}]]></style></defs><g id='Layer_x0020_1'><metadata/><g id='PlayButton'><g id='playButton'><path class='galerieRFil0' d='M615.6 3911.4c0,-1820.2 1475.6,-3295.8 3295.8,-3295.8 1820.2,0 3295.8,1475.6 3295.8,3295.8 0,1820.2 -1475.6,3295.8 -3295.8,3295.8 -1820.2,0 -3295.8,-1475.6 -3295.8,-3295.8zm7207.2 0c0,-2160.2 -1751.2,-3911.4 -3911.4,-3911.4 -2160.2,0 -3911.4,1751.2 -3911.4,3911.4 0,2160.2 1751.2,3911.4 3911.4,3911.4 2160.2,0 3911.4,-1751.2 3911.4,-3911.4z'/><path class='galerieRfil1' d='M6640.7 3956.9l-2236 1096.4 -2236 1096.4 0 -2192.9 0 -2192.9 2236 1096.4 2236 1096.4zm-1184.9 0l-1362.6 668.2 -1362.6 668.2 0 -1336.3 0 -1336.3 1362.6 668.2 1362.6 668.2z'/><polygon class='galerieRfil2 str0GalerieR' points='4093.2,4625.1 5455.8,3956.9 4093.2,3288.7 2730.5,2620.6 2730.5,3956.9 2730.5,5293.2 '/></g><path class='GalerieRfil3' d='M3911.4 615.6c-1820.2,0 -3295.8,1475.6 -3295.8,3295.8 0,1820.2 1475.6,3295.8 3295.8,3295.8 1820.2,0 3295.8,-1475.6 3295.8,-3295.8 0,-1820.2 -1475.6,-3295.8 -3295.8,-3295.8zm493.3 2244.8l2236 1096.4 -2236 1096.4 -2236 1096.4 0 -2192.9 0 -2192.9 2236 1096.4z'/><polygon class='galerieRfil4' points='4093.2,3288.7 2730.5,2620.6 2730.5,3956.9 2730.5,5293.2 4093.2,4625.1 5455.8,3956.9 '/></g></g></svg>";
		this.dialogIkonaFullscreen = "<svg id='GalerieRIkonaFullscreenSVG' xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='4em' height='4em' version='1.1' style='shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd' viewBox='0 0 6603.4 6603.4' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><style type='text/css'><![CDATA[.galerieRFil0 {fill:#FEFEFE}.galerieRfil1 {fill:white}.galerieRfil2 {fill:black;fill-opacity:0.400000}.GalerieRfil3 {fill:black;fill-opacity:0.600000}]]></style></defs><g id='Layer_x0020_1'><metadata/><g id='FullscreenButton'><g id='fullscreenButton'><path class='galerieRFil0' d='M1497.7 5114.4l0 -1395.5 375.8 375.2 479.9 -477c99.7,299.9 337.6,536.5 638.2,634.6l-481.2 478.2 385 384.4 -1397.6 0zm857.9 -2134.6l-482.6 -482.6 -375.3 372.9 0 -1381.1 1389.7 0 -376.7 374.3 486.5 486.5c-301.1,96.2 -540.1,331.3 -641.7,629.9zm1267.5 -624.4l485.5 -482.4 -383.8 -383.8 1381.1 0 0 1381.1 -360.8 -360.8 -491.2 488.2c-96.2,-301.4 -331.6,-540.6 -630.6,-642.1zm630.5 1250.9l485.3 485.3 366.9 -366.9 0 1389.7 -1389.7 0 387 -387.1 -477.2 -480.2c297.6,-102 531.7,-340.6 627.7,-640.9z'/><path class='galerieRfil1' d='M519.7 3301.7c0,-1536.5 1245.6,-2782 2782,-2782 1536.5,0 2782,1245.6 2782,2782 0,1536.5 -1245.6,2782 -2782,2782 -1536.5,0 -2782,-1245.6 -2782,-2782zm6083.7 0c0,-1823.5 -1478.2,-3301.7 -3301.7,-3301.7 -1823.5,0 -3301.7,1478.2 -3301.7,3301.7 0,1823.5 1478.2,3301.7 3301.7,3301.7 1823.5,0 3301.7,-1478.2 3301.7,-3301.7z'/><path class='galerieRfil2' d='M1880.4 4087.2c-128.9,-232.8 -202.3,-500.5 -202.3,-785.5 0,-288 75,-558.4 206.5,-792.9l-11.6 -11.6 -375.3 372.9 0 -1381.1 1389.7 0 -376.7 374.3 12.9 12.9c231,-126.4 496.1,-198.2 778,-198.2 288.5,0 559.5,75.3 794.3,207.2l12.5 -12.4 -383.8 -383.8 1381.1 0 0 1381.1 -360.8 -360.8 -16.6 16.5c125.7,230.5 197.1,494.9 197.1,775.9 0,281.9 -71.8,547 -198.2,778l11.8 11.8 366.9 -366.9 0 1389.7 -1389.7 0 387 -387.1 -8.4 -8.5c-234.5,131.5 -505,206.5 -793,206.5 -284.6,0 -552.2,-73.2 -784.8,-201.9l-6.6 6.6 385 384.4 -1397.6 0 0 -1395.5 375.8 375.2 6.9 -6.9zm1421.3 -3567.5c-1536.5,0 -2782,1245.6 -2782,2782 0,1536.5 1245.6,2782 2782,2782 1536.5,0 2782,-1245.6 2782,-2782 0,-1536.5 -1245.6,-2782 -2782,-2782z'/></g><path class='GalerieRfil3' d='M3301.7 1678.1c-281.9,0 -547,71.8 -778,198.2l473.5 473.5c-301.1,96.2 -540.1,331.3 -641.7,629.9l-471 -471c-131.5,234.5 -206.5,505 -206.5,792.9 0,284.9 73.4,552.7 202.3,785.5l473 -470.1c99.7,299.9 337.6,536.5 638.2,634.6l-474.6 471.7c232.6,128.7 500.1,201.9 784.8,201.9 288,0 558.5,-75 793,-206.5l-468.8 -471.8c297.6,-102 531.7,-340.6 627.7,-640.9l473.5 473.5c126.4,-231 198.2,-496.1 198.2,-778 0,-281 -71.4,-545.4 -197.1,-775.9l-474.6 471.7c-96.2,-301.4 -331.6,-540.6 -630.6,-642.1l473 -470c-234.8,-132 -505.8,-207.2 -794.3,-207.2z'/></g></g></svg>";

		var that = this;
		setTimeout(function() {
			$(document).ready(that.init());
		},100);
	}

	/**
	 * Inicializace
	 */
	init() {
		this.dejOdkazySNadpisy();
		this.vyrobaKontejneru();
		this.ovladaciPrvky();
		this.hlidejClick();
		this.vypniBackspace();
		this.hlidejResize();
		this.dialogFunkcionalita();
		this.slideShow();
		this.skryvejMys();
	}

	/**
	 * Slide show
	 */
	slideShow() {
		var that = this;
		setInterval(function() {
			if (that.slideShowZapnuto && !that.slideShowVynechat) {
				that.provedPosun("GalerieRNasledujici");
			}
			that.slideShowVynechat = false;
		},5000);
	}

	/**
	 * Událost změny velikosti průzoru
	 */
	hlidejResize() {
		var that = this;
		$(window).resize(function() {
			if ($("#GalerieR").css("display") != "none") {
				that.dejOdkazySNadpisy();
				that.zobrazInformace();
				that.odscrolluj();
			}
			that.dialogNastavTlacitka();
		});
	}

	/**
	 * Efektíček na buttony
	 */
	efekticekNaButtony(button) {
		var button;

		$(button).css({
			transform: "scale(1.2) rotate(360deg)"
		});
		setTimeout(function() {
			$(button).stop().transition({
				scale: "1",
				rotate: "0deg"
			},this.rychlostRozsvitu);
		},100);
	}

	/**
	 * Vyhledání všech obrázků a nadpisů včetně párování do asociativního pole
	 */
	dejOdkazySNadpisy() {
		var obrazky = $(this.selector).get();
		var nadpisy = $(this.selectorNadpis).get();
		var nadpisyPrac = new Array();
		
		Object.keys(obrazky).forEach(key => {
			this.odkazySNadpisy[key] = new Array();
			this.odkazySNadpisy[key]["objekt"] = obrazky[key];							// objekt
			this.odkazySNadpisy[key]["positionTop"] = $(obrazky[key]).offset().top;		// pozice zezhora
			if (obrazky[key].alt != "") {
				this.existujiInformace = true;
			}
		});
		this.odkazySNadpisy.sort(this.serazeniObjektu);

		Object.keys(nadpisy).forEach(key => {
			nadpisyPrac[key] = new Array();
			nadpisyPrac[key]["nadpis"] = $(nadpisy[key]).html();
			nadpisyPrac[key]["positionTop"] = $(nadpisy[key]).offset().top;
		});
		nadpisyPrac.sort(this.serazeniObjektu);
		
		Object.keys(this.odkazySNadpisy).forEach(key => {
			Object.keys(nadpisyPrac).forEach(key2 => {
				if (parseInt(nadpisyPrac[key2]["positionTop"]) <= parseInt(this.odkazySNadpisy[key]["positionTop"])) {
					this.odkazySNadpisy[key]["nadpis"] = nadpisyPrac[key2]["nadpis"];
					this.existujiInformace = true;
				}
			});
		});
	}

	serazeniObjektu(a, b) {
		var aName = a.positionTop;
		var bName = b.positionTop; 
		return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
	}

	/**
	 * Zda-li jsme klikli na obrázek v dokumentu
	 */
	hlidejClick() {
		var that = this;
		$(document).on("click", this.selector, function() {
			that.objekt = this;
			that.vykreslitKontext();
			$("#GalerieR").css("cursor","none");
			return false;
		});
	}

	/**
	 * Kontrola obrázku v odkazu
	 */
	kontrolaImgVOdkazu() {
		if (this.img = $(this.objekt).find("img")[0]) {
			return true;
		} else {
			return false;
		}
		
	}

	/**
	 * Výroba HTML, CSS a zobrazení
	 */
	vyrobaKontejneru() {
		if ($("body").append("<div id='GalerieR' style='opacity: 1;'><div id='GalerieRObsah'></div></div>")) {
			console.log("GalerieR:","Kontejner vytvořen");
		} else {
			console.log("GalerieR:","Při vytváření kontejneru došlo k chybě");
		}
	
		$("#GalerieR").css({
			display: "none",
			opacity: "0",
			position: "fixed",
			zIndex: "3000",
			margin: "0",
			padding: "0",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			backgroundColor: this.backgroundColor,
			userSelect: "none",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		/**
		 * Tvorba ovládacích prvků
		 */

		$("#GalerieR").append("<div id='GalerieREfekticek'></div>");
		$("#GalerieR").append("<div id='GalerieRInfoknoNadpis'><div id='GalerieRInfoNadpis'></div></div>");
		$("#GalerieR").append("<div id='GalerieRInfokno'><div id='GalerieRInfo'></div></div>");
		$("#GalerieR").append("<div id='GalerieRPredchozi' class='GalerieROvladani'><svg xmlns='http://www.w3.org/2000/svg'	xml:space='preserve' width='25%' height='25%' version='1.1' style='opacity: 1; margin: auto; shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd' viewBox='0 0 109.38 109.37' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><style type='text/css'><![CDATA[.galerieRSipkaDolevaFil2 {fill:black} .galerieRSipkaDolevaFil1 {fill:white} .galerieRSipkaDolevaFil0 {fill:black;fill-opacity:0.000000}]]></style></defs><g><metadata/><g id='galerieSipkaDoleva'><polygon class='galerieRSipkaDolevaFil0' points='-0,0 109.38,0 109.38,109.37 -0,109.37 '/><path class='galerieRSipkaDolevaFil1' d='M27.6 44.57l37.95 -37.95c2.78,-2.78 7.34,-2.78 10.12,0l0 0c2.78,2.78 2.78,7.34 0,10.12l-37.95 37.95 37.95 37.95c2.78,2.78 2.78,7.34 0,10.12l0 0c-2.78,2.78 -7.34,2.78 -10.12,0l-37.95 -37.95 -10.12 -10.12 10.12 -10.12z'/><path class='galerieRSipkaDolevaFil2' d='M27.6 44.57l37.95 -37.95c2.78,-2.78 7.34,-2.78 10.12,0 2.78,2.78 2.78,7.34 0,10.12l-37.95 37.95 37.95 37.95c2.78,2.78 2.78,7.34 0,10.12 -2.78,2.78 -7.34,2.78 -10.12,0l-48.07 -48.07 10.12 -10.12zm39.7 -36.2l-46.31 46.32 46.31 46.32c0.91,0.91 2.11,1.36 3.31,1.36 1.2,0 2.4,-0.45 3.31,-1.36l0 0c0.91,-0.91 1.36,-2.11 1.36,-3.31 0,-1.21 -0.45,-2.41 -1.36,-3.31l-0 0 -39.7 -39.7 39.7 -39.7 0 0c0.91,-0.91 1.36,-2.11 1.36,-3.31 0,-1.2 -0.45,-2.4 -1.36,-3.31l-0.18 -0.18c-0.88,-0.79 -2,-1.18 -3.13,-1.18 -1.2,0 -2.4,0.45 -3.31,1.36z'/></g></g></svg></div>");
		$("#GalerieR").append("<div id='GalerieRNasledujici' class='GalerieROvladani'><svg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='25%' height='25%' version='1.1' style='opacity: 1; margin: auto; shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd' viewBox='0 0 131.25 131.25' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><style type='text/css'><![CDATA[.galerieRSipkaDopravaFil2 {fill:black} .galerieRSipkaDopravaFil1 {fill:white} .galerieRIkonaSipkaDopravaFil0 {fill:black;fill-opacity:0.000000}]]></style></defs><g><metadata /><g><polygon class='galerieRIkonaSipkaDopravaFil0' points='131.25,0 -0,0 -0,131.25 131.25,131.25 '/><path class='galerieRSipkaDopravaFil1' d='M98.13 53.48l-45.54 -45.54c-3.34,-3.34 -8.8,-3.34 -12.14,0l0 0c-3.34,3.34 -3.34,8.8 0,12.14l45.54 45.54 -45.54 45.54c-3.34,3.34 -3.34,8.8 0,12.14l0 0c3.34,3.34 8.8,3.34 12.14,0l45.54 -45.54 12.14 -12.14 -12.14 -12.14z'/><path class='galerieRSipkaDopravaFil2' d='M96.03 55.58l-45.54 -45.54c-1.09,-1.09 -2.53,-1.63 -3.97,-1.63 -1.44,0 -2.87,0.54 -3.96,1.62l-0.01 0.01c-1.09,1.09 -1.63,2.53 -1.63,3.97 0,1.44 0.54,2.88 1.63,3.97l47.64 47.64 -47.64 47.64c-1.09,1.09 -1.63,2.53 -1.63,3.97 0,1.44 0.54,2.87 1.62,3.96l0.01 0.01c1.09,1.09 2.53,1.63 3.97,1.63 1.44,0 2.88,-0.54 3.97,-1.63l55.58 -55.58 -10.04 -10.04zm2.1 -2.1l-45.54 -45.54c-3.34,-3.34 -8.8,-3.34 -12.14,0 -3.34,3.34 -3.34,8.8 0,12.14l45.54 45.54 -45.54 45.54c-3.34,3.34 -3.34,8.8 0,12.14 3.34,3.34 8.8,3.34 12.14,0l57.68 -57.68 -12.14 -12.14z'/></g></g></svg></div>");
		$("#GalerieR").append("<div id='GalerieRExitus' class='GalerieROvladani'><svg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='25%' height='25%' version='1.1' style='opacity: 1; margin: auto; shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd' viewBox='0 0 93.75 93.75' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><style type='text/css'><![CDATA[.galerieRKrizekFil2 {fill:black} .galerieRKrizekFil1 {fill:white} .galerieRKrizekFil0 {fill:black;fill-opacity:0.000000}]]></style></defs><g><metadata/><g id='galerieKrizek'><polygon class='galerieRKrizekFil0' points='93.75,0 -0,0 -0,93.75 93.75,93.75 '/><path class='galerieRKrizekFil1' d='M46.88 38.2l32.53 -32.53c2.39,-2.38 6.29,-2.38 8.67,0l0 0c2.39,2.38 2.39,6.29 0,8.67l-32.53 32.53 32.53 32.53c2.38,2.39 2.38,6.29 0,8.67l-0 0c-2.38,2.38 -6.29,2.38 -8.67,0l-32.53 -32.53 -32.53 32.53c-2.39,2.38 -6.29,2.38 -8.67,0l-0 0c-2.38,-2.39 -2.38,-6.29 0,-8.67l32.53 -32.53 -32.53 -32.53c-2.39,-2.39 -2.39,-6.29 0,-8.67l0 -0c2.38,-2.38 6.29,-2.38 8.67,0l32.53 32.53z'/><path class='galerieRKrizekFil2' d='M46.88 38.2l32.53 -32.53c2.39,-2.38 6.29,-2.38 8.67,0 2.39,2.39 2.39,6.29 0,8.67l-32.53 32.53 32.53 32.53c2.38,2.39 2.38,6.29 0,8.67 -2.39,2.38 -6.29,2.38 -8.67,0l-32.53 -32.53 -32.53 32.53c-2.39,2.38 -6.29,2.38 -8.67,0 -2.39,-2.39 -2.39,-6.29 -0,-8.67l32.53 -32.53 -32.53 -32.53c-2.39,-2.39 -2.39,-6.29 0,-8.67 2.38,-2.39 6.29,-2.39 8.67,-0l32.53 32.53zm34.03 -31.02l-34.03 34.03 -34.03 -34.03c-0.78,-0.78 -1.81,-1.17 -2.84,-1.17 -1.03,0 -2.05,0.39 -2.83,1.16l-0.01 0.01c-0.78,0.78 -1.17,1.81 -1.17,2.84 0,1.03 0.39,2.06 1.17,2.84l34.03 34.03 -34.03 34.03c-0.78,0.78 -1.17,1.81 -1.17,2.84 0,1.03 0.39,2.05 1.16,2.83l0.01 0.01c0.78,0.78 1.81,1.17 2.84,1.17 1.03,0 2.06,-0.39 2.84,-1.17l34.03 -34.03 34.03 34.03c0.78,0.78 1.81,1.17 2.84,1.17 1.03,0 2.06,-0.39 2.84,-1.17l0.01 -0.01c0.77,-0.78 1.16,-1.8 1.16,-2.83 0,-1.03 -0.39,-2.06 -1.17,-2.84l-34.03 -34.03 34.03 -34.03c0.78,-0.78 1.17,-1.81 1.17,-2.84 0,-1.03 -0.39,-2.06 -1.17,-2.84l-0.01 -0.01c-0.78,-0.77 -1.8,-1.16 -2.83,-1.16 -1.03,0 -2.06,0.39 -2.84,1.17z'/></g></g></svg></div>");
		$("#GalerieR").append("<div id='GalerieRDialogokno'><div id='GalerieRDialog'></div></div>");

		$("#GalerieRDialogokno").css({
			position: "absolute",
			display: "none",
			width: "100%",
			height: "100%",
			userSelect: "none",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieRDialog").css({
			color: "rgba(255,255,255,1)",
			textAlign: "center",
			padding: "1em",
			margin: "auto",
			backgroundColor: "rgba(0,0,0,.5)",
			borderRadius: "10em",
			boxShadow: "0 0 1em rgba(0,0,0,1)",
			userSelect: "none",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});		

		$("#GalerieREfekticek").css({
			position: "absolute",
			display: "flex",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			backgroundSize: "contain",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			userSelect: "none",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieRInfoNadpis").css({
			margin: "auto",
			color: "rgba(255,255,255,1)",
			opacity: "1",
			marginTop: "1em",
			marginBottom: "1em",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieRInfoknoNadpis").css({
			display: "flex",
			position: "absolute",
			top: "0",
			left: "0",
			backgroundColor: "rgba(0,0,0,.5)",
			width: "100%",
			opacity: "0",
			userSelect: "none",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieRInfo").css({
			margin: "auto",
			color: "rgba(255,255,255,1)",
			opacity: "1",
			marginTop: "1em",
			marginBottom: "1em",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieRInfokno").css({
			display: "flex",
			position: "absolute",
			bottom: "0",
			left: "0",
			backgroundColor: "rgba(0,0,0,.5)",
			width: "100%",
			opacity: "0",
			userSelect: "none",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieRPredchozi").css({
			display: "flex",
			position: "absolute",
			top: "0",
			left: "0",
			// backgroundColor: "rgba(0,255,0,.2)",
			backgroundColor: "none",
			width: "33.5%",
			height: "100%",
			opacity: "1",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieRNasledujici").css({
			display: "flex",
			position: "absolute",
			top: "0",
			right: "0",
			// backgroundColor: "rgba(0,255,0,.2)",
			backgroundColor: "none",
			width: "33.5%",
			height: "100%",
			opacity: "1",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieRExitus").css({
			display: "flex",
			position: "absolute",
			top: "0",
			left: "33.5%",
			// backgroundColor: "rgba(255,0,0,.2)",
			backgroundColor: "none",
			width: "33%",
			height: "100%",
			opacity: "1",
			outline: "0",
			webkitTapHighlightColor: "rgba(0,0,0,0)",
			webkitTapHighlightColor: "transparent"
		});

		$("#GalerieR div").css("transform","scale(.5)");

	}

	/**
	 * Vykreslení kontextu
	 */
	vykreslitKontext() {
		$("#GalerieR div.GalerieROvladani").css("opacity","1");
		if (this.objekt.nodeName == "A") {
			if (this.kontrolaImgVOdkazu()) {
				$("#GalerieR").css({
					display: "flex",
					position: "fixed",
					margin: "0",
					padding: "0",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					backgroundColor: this.backgroundColor
				});

				$("#GalerieR div#GalerieRObsah").css({
					backgroundImage: "url(" + this.img.src + ")",
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					margin: "0",
					padding: "0",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
				});
			}
			this.odscrolluj();
		}
		
		/**
		 * Rozsvit
		 */
		
		this.nalezeniIdObjektu();
		this.zobrazInformace();
		this.najdiSousedniObrazky();
		
		$("#GalerieR").stop().animate({
			opacity: "1"
		},this.rychlostRozsvitu);
		
		$("#GalerieR div").stop().transition({
			scale: "1"
		},this.rychlostRozsvitu);

		var that = this;
		setTimeout(function() {
			$(".GalerieROvladani").stop().animate({
				opacity: "0"
			},that.rychlostRozsvitu * 3);
		},1000);
		this.zobrazInformace();
		
		this.dialogTyp = "info_ovladani";
		var that = this;
		if (!this.dejCookie("prvniZobrazeniGalerieR")) {
			setTimeout(function() {
				that.dialog("Použitím pravého tlačíka myši či dlouhým<br>stiskem prstu zobrazíte možnosti galerie.");
				document.cookie = 'prvniZobrazeniGalerieR=ne';
			},that.rychlostRozsvitu * 3);
		}

		$("#GalerieRDialogokno").css({
			transform: "scale(.5)"
		});
	}

	/**
	 * Skrývání kurzoru myši
	 */
	skryvejMys() {
		$(document).ready(function() {
			var j;
			var that = this;
			$("#GalerieR").mousemove(function() {
				if (!that.mysSchovana) {
					that.mysSchovana = false;
					clearTimeout(j);
					$('#GalerieR').css({
						cursor: "pointer"
					});
					j = setTimeout(function() {
						skryjMys();
					}, 200);
				}
			});
		});

		var that = this;
		function skryjMys() {
			if ($("#GalerieR").css("display") != "none") {
				$("#GalerieR").css({
					cursor: "none"
				});
				that.mysSchovana = true;
			}
		}

	}

	/**
	 * Čtení cookies
	 */
	dejCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	/**
	 * Dialogové okno
	 */
	dialogExitus() {
		var that = this;
		$("#GalerieRDialogokno").stop().transition({
			opacity: "0",
			scale: ".5"
		},that.rychlostRozsvitu,function() {
			$("#GalerieRDialogokno").css("display","none");
		});
	}

	/**
	 * Zobrazení dialogu
	 */
	dialog(sdeleni) {
		
		var sdeleni;
		var that = this;

		this.klikNaTlacitko = false;

		$("#GalerieRDialogokno").css({
			opacity: "0",
			display: "flex"
		});
		$("#GalerieRDialog").html(sdeleni);
		$("#GalerieRDialogokno").transition({
			opacity: "1",
			scale: "1"
		},that.rychlostRozsvitu);

	}
	
	/**
	 * Funkcionalita dialogu
	 */
	dialogFunkcionalita() {
		
		var that = this;
		var klikNaTlacitko = false;

		$(document).on("click","#GalerieRIkonaInfoSVG",function() {
			that.efekticekNaButtony(this);
			if (that.dialogTyp == "hlavni_menu") {
				if (that.zobrazovatInformace) {
					that.zobrazovatInformace = false;
					that.zobrazInformace();
					that.dialogNastavTlacitka();
				} else {
					that.zobrazovatInformace = true;
					that.zobrazInformace();
					that.dialogNastavTlacitka();
				}
			}
			that.klikNaTlacitko = true;
		});

		$(document).on("click","#GalerieRIkonaFullscreenSVG",function() {
			that.efekticekNaButtony(this);
			if (that.dialogTyp == "hlavni_menu") {
				that.ovladaniFullscreen();
			}
			that.klikNaTlacitko = true;
		});

		$(document).on("click","#GalerieRIkonaSlideshowSVG",function() {
			that.efekticekNaButtony(this);
			if (that.dialogTyp == "hlavni_menu") {
				if (that.slideShowZapnuto) {
					that.slideShowZapnuto = false;
					that.dialogNastavTlacitka();
				} else {
					that.slideShowZapnuto = true;
					that.dialogNastavTlacitka();
				}
			}
			that.klikNaTlacitko = true;
		});

		$(document).on("click","#GalerieRDialogokno",function() {
			if (!that.klikNaTlacitko) {
				that.dialogExitus();
			} else {
				that.klikNaTlacitko = false;
			}
		});

	}

	/**
	 * Nalezení id objektu v poli odkazySNadpisy
	 */
	nalezeniIdObjektu() {
		Object.keys(this.odkazySNadpisy).forEach(key => {
			if (this.odkazySNadpisy[key]["objekt"] == this.objekt) {
				this.ukazatelObjektu = parseInt(key);
			}
		});
	}

	/**
	 * EXIT - opuštění galerie
	 */
	exitus() {
		this.slideShowZapnuto = false;
		$.fullscreen.exit();
		$("#GalerieR div").stop().transition({
			scale: ".5"
		},this.rychlostRozsvitu);
		var that = this;
		$("#GalerieR").stop().animate({
			opacity: "0"
		},this.rychlostRozsvitu,function () {
			that.dialogExitus();
			$("#GalerieR").css("display","none");
			$(".GalerieROvladani").css("opacity","1");
		});
	}

	/**
	 * Obsluha ovládacích prvků
	 */
	ovladaciPrvky() {

		var that = this;
		$(document).on("click","#GalerieRNasledujici, #GalerieRPredchozi",function() {
			that.provedPosun(this.id);
		});
		
		$(document).on("click","#GalerieRExitus",function() {
			that.exitus();
		});

		// odchyt klávesnice
		$(document).on("keydown",function(event) {
			if ($("#GalerieR").css("display") != "none") {
				if (event.which == 39) {
					that.provedPosun("GalerieRNasledujici");
				}
				if (event.which == 37) {
					that.provedPosun("GalerieRPredchozi");
				}
				if (event.which == 27 || event.which == 8) {
					if ($("#GalerieRDialogokno").css("display") == "flex") {
						that.dialogExitus();
					} else {
						that.exitus();
					}
				}

				// ovládání ltačítek v menu pomocí klávesnice
				if (event.which == 32) { // space
					if (that.slideShowZapnuto) {
						that.slideShowZapnuto = false;
						that.dialogNastavTlacitka();
						that.slideShowVynechat = false;
						return false;
					} else {
						that.dialogNastavTlacitka();
						that.provedPosun("GalerieRNasledujici");
						that.slideShowVynechat = true;
						that.slideShowZapnuto = true;
						that.dialogNastavTlacitka();
						return false;
					}
				}
				if (event.which == 73) { // i
					if (that.zobrazovatInformace) {
						that.zobrazovatInformace = false;
						that.dialogNastavTlacitka();
						that.zobrazInformace();
						return false;
					} else {
						that.zobrazovatInformace = true;
						that.dialogNastavTlacitka();
						that.zobrazInformace();
						return false;
					}
				}
				if (event.which == 13) { // enter
					that.ovladaniFullscreen();
					return false;
				}
			}
		});

		// dialogové okno
		var that = this;
		$(document).on("contextmenu","#GalerieR",function() {
			if ($("#GalerieRDialogokno").css("display") == "none") {

				that.dialogTyp = "hlavni_menu";

				var html = that.dejOvladaciPrvkyHTML();
				
				that.dialog(html);
				that.dialogNastavTlacitka();
				return false;
			} else {
				if (that.dialogTyp == "info_ovladani") {
					that.dialogExitus();
					setTimeout(function() {
						that.dialogTyp = "hlavni_menu";

						var html = that.dejOvladaciPrvkyHTML();
						
						that.dialog(html);
						that.dialogNastavTlacitka();
					},that.rychlostRozsvitu * 1.5);
				} else {
					that.dialogExitus();
				}
				return false;
			}
		});
	}

	/**
	 * Dej HTML dialogového okna ovládacích prvků
	 */
	 dejOvladaciPrvkyHTML() {
		var oddelovac = "&nbsp;&nbsp;&nbsp;&nbsp;";
	 	var html = "<div style='padding: .2em .3em 0 .3em;'>";
		if (this.existujiInformace) {
			html += this.dialogIkonaInfo + oddelovac;
		}
		html += this.dialogIkonaSlideshow + oddelovac;
		html += this.dialogIkonaFullscreen;
		html += "</div>";
		

		html += "<div style='text-align: center;'>"
		
		if (this.existujiInformace) {
			html += "<div style='display: inline-block; width: " + $(this.dialogIkonaInfo).attr("width") + "; text-align: center;'>";
			html += "<span style='white-space: nowrap'>[ i ]</span>";
			html += "</div>" + oddelovac;
		}

		html += "<div style='display: inline-block; width: " + $(this.dialogIkonaSlideshow).attr("width") + "; text-align: center;'>";
		html += "<span style='white-space: nowrap'>[ space ]</span>";
		html += "</div>" + oddelovac;

		html += "<div style='display: inline-block; width: " + $(this.dialogIkonaFullscreen).attr("width") + "; text-align: center;'>";
		html += "<span style='white-space: nowrap'>[ enter ]</span>";
		html += "</div>";

		html += "</div>"

		return html;
	 }

	/**
	 * Nastav správně tlačítka v dialogu
	 */
	dialogNastavTlacitka() {
		if (this.zobrazovatInformace) {
			$("#GalerieRIkonaInfoSVG .galerieRFil0").css("fill","rgba(255,255,255,1)");
		} else {
			$("#GalerieRIkonaInfoSVG .galerieRFil0").css("fill","rgba(255,255,255,.5)");
		}
		if (this.slideShowZapnuto) {
			$("#GalerieRIkonaSlideshowSVG .galerieRFil0").css("fill","rgba(255,255,255,1)");
		} else {
			$("#GalerieRIkonaSlideshowSVG .galerieRFil0").css("fill","rgba(255,255,255,.5)");
		}
		if ($.fullscreen.isFullScreen()) {
			$("#GalerieRIkonaFullscreenSVG .galerieRFil0").css("fill","rgba(255,255,255,1)");
		} else {
			$("#GalerieRIkonaFullscreenSVG .galerieRFil0").css("fill","rgba(255,255,255,.5)");
		}
	}

	/**
	 * Přepíná na další nebo předchozí obrázek
	 */
	provedPosun(id) {

		var id;

		this.efekticek();
		
		if (id == "GalerieRNasledujici") {
			this.objekt = this.odkazySNadpisy[this.nasledujiciObjektUkazatel]["objekt"];
			this.ukazatelObjektu = this.nasledujiciObjektUkazatel;
			if (this.kontrolaImgVOdkazu()) {
 				$("#GalerieR div#GalerieRObsah").css({
					backgroundImage: "url(" + this.img.src + ")"
				});
			}
		} else {
			this.objekt = this.odkazySNadpisy[this.predchoziObjektUkazatel]["objekt"];
			this.ukazatelObjektu = this.predchoziObjektUkazatel;
			if (this.kontrolaImgVOdkazu()) {
 				$("#GalerieR div#GalerieRObsah").css({
					backgroundImage: "url(" + this.img.src + ")"
				});
			}
		}
		
		this.najdiSousedniObrazky();
		this.zobrazInformace();
		this.odscrolluj();
	}

	/*
	 * Efektíček
	 */
	efekticek() {
		$("#GalerieREfekticek").css({
			backgroundImage: "url(" + this.img.src + ")",
			opacity: "1"
		});
		var that = this;
		$("#GalerieREfekticek").stop().animate({
			opacity: "0"
		},that.rychlostRozsvitu);
	}

	/*
	 * Zobrazení informací u média
	 */
	zobrazInformace() {
		
		var that = this;
		
		if (this.zobrazovatInformace) {
			if (this.odkazySNadpisy[this.ukazatelObjektu]["nadpis"]) {
				$('#GalerieRInfoNadpis').css("display","flex");
				$("#GalerieRInfoNadpis").html(this.odkazySNadpisy[this.ukazatelObjektu]["nadpis"]);
				$("#GalerieRInfoNadpis").stop().transition({
					scale: "1",
					opacity: "1"
				},that.rychlostRozsvitu);
				$("#GalerieRInfoknoNadpis").stop().animate({
					opacity: "1"
				},that.rychlostRozsvitu);
			} else {
				$("#GalerieRInfoNadpis").stop().transition({
					scale: ".5",
					opacity: "0"
				},that.rychlostRozsvitu);
				$("#GalerieRInfoknoNadpis").stop().animate({
					opacity: "0"
				},that.rychlostRozsvitu);
			}
			
			if (this.img.alt != "") {
				$("#GalerieRInfo").css("display","flex");
				$("#GalerieRInfo").html(this.img.alt);
				$("#GalerieRInfo").stop().transition({
					scale: "1",
					opacity: "1"
				},that.rychlostRozsvitu);
				$("#GalerieRInfokno").stop().animate({
					opacity: "1"
				},that.rychlostRozsvitu);
			} else {
				$("#GalerieRInfo").transition({
					scale: ".5",
					opacity: "0"
				},that.rychlostRozsvitu);
				$("#GalerieRInfokno").stop().animate({
					opacity: "0"
				},that.rychlostRozsvitu);
			}
		} else {
			$('#GalerieRInfoknoNadpis, #GalerieRInfokno').stop().animate({
				opacity: "0"
			},that.rychlostRozsvitu);
		}

	}

	/**
	 * Fullscreen
	 */
	ovladaniFullscreen() {
		if ($.fullscreen.isFullScreen()) {
			$.fullscreen.exit();
			$("#GalerieRIkonaFullscreenSVG .galerieRFil0").css("fill","rgba(255,255,255,.5)");
		} else {
			$("#GalerieR").fullscreen();
			$("#GalerieRIkonaFullscreenSVG .galerieRFil0").css("fill","rgba(255,255,255,1)");
		}
	}

	/**
	 * Provede odscrollování
	 */
	odscrolluj() {
		var pozice = $(this.img).offset().top - ($(window).height() / 2) + ($(this.img).height() / 2);
		var body = $("html, body");
		body.stop().animate({
			scrollTop: pozice
		}, this.rychlostRozsvitu, 'swing');
	}

	dejObjektNadpisu() {
		var navrat = $(this.objekt).prevAll(this.selectorNadpis);
		return navrat;
	}

	vypniBackspace() {
		$(document).bind("keydown keypress", function(e){
			if(e.which == 8 && $("#GalerieR").css("opacity") != "0"){
				e.preventDefault();
			}
		});
	}

	najdiSousedniObrazky() {
		var pracovniUkazatelNasledujici = 0;
		var pracovniUkazatelPredchozi = 0;

		pracovniUkazatelNasledujici = this.ukazatelObjektu + 1;
		pracovniUkazatelPredchozi = this.ukazatelObjektu - 1;
		
		if (pracovniUkazatelNasledujici == this.odkazySNadpisy.length) {
			pracovniUkazatelNasledujici = 0;
		}
		if (pracovniUkazatelPredchozi < 0) {
			pracovniUkazatelPredchozi = this.odkazySNadpisy.length - 1;
		}

		this.predchoziObjektUkazatel = pracovniUkazatelPredchozi;
		this.nasledujiciObjektUkazatel = pracovniUkazatelNasledujici;
	}

}
