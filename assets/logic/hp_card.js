/* JS for tab "homepage" reminder & card */

import { vns_method_to_btn_name } from './anicard.js';

// homepage card class

const VNS_tag_color = {
    "C1": "#E3F4EF",
    "C2": "#E3F4EF",
    "C3": "#E3F4EF",
    "C4": "#FEEAE3",
    "C5": "#FEEAE3",
    "C6": "#FEEAE3",
    "C7": "#EBEEF6",
    "C8": "#EBEEF6",
    "C9": "#EBEEF6",
    "C10": "#FBEAF4",
    "C11": "#FBEAF4",
    "C12": "#FBEAF4",
    "C13": "#EFF8E0",
    "C14": "#FAF4EC"
}
class Homepage_Card {
    constructor(parameters = { 
        card_id, card_title, VNS_tag, VNS_clustername, VNS_ambiguity, EL_tag, EL_tag2, AVT_tag, how, why, 
        eg_title, eg_venue, eg_url, eg_year, eg_category, eg_subcategory
    }) {
        this.parameters = {};
        this.parameters = parameters;
    }
    _createNone () {
        let Ability_node = document.createElement("div");
        return Ability_node;
    }
    //大的创建卡片的方法，里面调用了几个小方法：创建卡片头、身子、尾部等
    _createCard () {
        let deck_single_node = document.createElement("div");
        let card_inner_node = document.createElement("div");
        let card_front_node = document.createElement("div");
        let card_back_node = document.createElement("div");
        let card_front_header_color = this._createCard_header_color();
        let card_back_header_color = this._createCard_header_color();
        let card_front_header = this._createCard_header();
        let card_back_header = card_front_header.cloneNode(true);
        deck_single_node.classList.add("col-xl-4", "col-lg-6", "col-sm-12", "card-deck-single");
        card_inner_node.classList.add("card-inner", `el-${this.parameters["EL_tag1"].replace(/\s+/g, "-")}`, `${this.parameters["VNS_tag"]}`);
        card_front_node.classList.add("card", "front");
        card_back_node.classList.add("card", "back");

        deck_single_node.setAttribute("name", "card_" + this.parameters["card_id"]);

        
        // front
        let front_nodeList = [
            card_front_header_color,
            card_front_header, 
            this._createCard_frontBody(),
            this._createCard_frontImg(),
            this._createCard_footer(1)
        ];
        front_nodeList.forEach((node, i, nodeList) => card_front_node.appendChild(node));

        // back
        let back_nodeList = [
            card_back_header_color,
            card_back_header, 
            this._createCard_backApplicationBox(),
            this._createCard_backBody(), 
            this._createCard_backCode(), 
            this._createCard_footer(0)
        ];
        back_nodeList.forEach((node, i, nodeList) => card_back_node.appendChild(node));

        
        // insert to card-inner
        [card_front_node, card_back_node].forEach(
            (node, i, nodeList) => card_inner_node.appendChild(node)
        );

        deck_single_node.appendChild(card_inner_node);
        return deck_single_node;
    }




    _get_aim_deck () {
        if(this.parameters["VNS_tag"]) {
            return this.parameters["VNS_tag"];
        }
        return "";
    }

    _get_param(param_key) {
        param_key = param_key + "" || "card_id";
        if(Object.keys(this.parameters).indexOf(param_key) < 0) {
            return -1;
        }
        return this.parameters[param_key];
    }

    /**
    * <div class="card-header">
    *     <div class="header-text">
    *         <div class="header-text-title">Pulse</div>
    *         <div class="header-text-class">The elements of visualization</div>
    *     </div>
    *     <span class="header-symbol"></span>
    * </div> 
    * */
    _createCard_header_color () {
        let card_header_color_node = document.createElement("div");
        card_header_color_node.innerHTML = `<div class="header-color"></div>`;
        return card_header_color_node;
    }
    _createCard_header () {
        let card_header_node = document.createElement("div");
        let header_year_node = document.createElement("div");
        let header_text_node = document.createElement("div");
        let header_classification_node = document.createElement("div");

        // let header_symbol_node = document.createElement("span");  // 缺了icon图片定义

        let year_html = `<div class="card-body-text">${vns_method_to_btn_name(this.parameters["year"])}</div>`;
        let title_html = `<div class="header-text-title">${vns_method_to_btn_name(this.parameters["card_title"])}</div>`;

        card_header_node.classList.add("card-header", `el-${this.parameters["EL_tag1"].replace(/\s+/g, "-")}`);
        header_year_node.classList.add("header-year");
        header_text_node.classList.add("header-text");
        header_classification_node.classList.add("header_classification");

        header_year_node.innerHTML = year_html;
        header_text_node.innerHTML = title_html;

        [header_year_node, header_text_node, header_classification_node].forEach((node, i, nodeList) => card_header_node.appendChild(node));
        // [header_text_node, header_symbol_node].forEach((node, i, nodeList) => card_header_node.appendChild(node));
        return card_header_node;
    }

    // _createCard_frontBody () {
    //     let card_body_node = document.createElement("div");
    //     // let card_frontBody_titleHtml = "";
    //     let card_frontBody_textHtml = "";
    //     // let card_body_front_textArray = [
    //     //     this.parameters["how"], this.parameters["why"], this.parameters["AVT_tag"]
    //     // ];

    //     let card_body_front_text = [
    //         this.parameters["how"]
    //     ];

    //     card_body_node.classList.add("card-body");

    //     Homepage_Card.card_body_front_titleArray.forEach((title, i, titleList) => {
    //         if(card_body_front_textArray[i] === "") {
    //             return ;
    //         }
    //         // card_frontBody_titleHtml = `<div class="card-body-subtitle">${title}</div>`;
    //         card_frontBody_textHtml = `<p class="card-body-text">${card_body_front_textArray[i]}</p>`;
    //         card_body_node.innerHTML  += card_frontBody_textHtml; 
    //     });

    //     // 原版
    //     // Homepage_Card.card_body_front_titleArray.forEach((title, i, titleList) => {
    //     //     if(card_body_front_textArray[i] === "") {
    //     //         return ;
    //     //     }
    //     //     card_frontBody_titleHtml = `<div class="card-body-subtitle">${title}</div>`;
    //     //     card_frontBody_textHtml = `<p class="card-body-text">${card_body_front_textArray[i]}</p>`;
    //     //     card_body_node.innerHTML  += (card_frontBody_titleHtml + card_frontBody_textHtml); 
    //     // });
        
    //     return card_body_node;
    // }
    /**
     * front
    * <div class="card-frontImg">
    *     <img class="card-img front-gif" src="./assets/image/fail_loading.svg">
    *     <img class="card-img front-preview" src="./assets/image/loading.svg">
    * </div> 
    * */
    _createCard_frontImg () {
        let card_frontImg_node = document.createElement("div");
        var num = this.parameters["card_id"];
        // console.log (this.parameters["card_id"]);
        var AVT_tag = this.parameters["AVT_tag"];
        var VNS_tag = this.parameters["VNS_tag"]; 

        if(AVT_tag==0 || AVT_tag==1){
            let front_preview_html = `<img class="card-img front-preview" src="./assets/hp_front_preview/front_${num}.png">`  // 缺少正面预览png
            card_frontImg_node.classList.add("card-frontImg");
            card_frontImg_node.innerHTML = front_preview_html;
        }

        // if(AVT_tag==1){
        //     if( VNS_tag == "Observations"){
        //         let front_preview_html = `<img class="card-img front-preview" src="./assets/hp_front_preview/front_${num}_1.png">`
        //         card_frontImg_node.classList.add("card-frontImg");
        //         card_frontImg_node.innerHTML = front_preview_html;
        //     }else if( VNS_tag == "C5"){
        //         let front_preview_html = `<img class="card-img front-preview" src="./assets/hp_front_preview/front_${num}_1.png">`
        //         card_frontImg_node.classList.add("card-frontImg");
        //         card_frontImg_node.innerHTML = front_preview_html;
        //     }else if( VNS_tag == "C3"){
        //         let front_preview_html = `<img class="card-img front-preview" src="./assets/hp_front_preview/front_${num}_1.png">`
        //         card_frontImg_node.classList.add("card-frontImg");
        //         card_frontImg_node.innerHTML = front_preview_html;
        //     }else {
        //         let front_preview_html = `<img class="card-img front-preview" src="./assets/hp_front_preview/front_${num}.png">`  // 缺少正面预览png
        //         card_frontImg_node.classList.add("card-frontImg");
        //         card_frontImg_node.innerHTML = front_preview_html;
        //     }
            
        // }
        
        return card_frontImg_node;
    }

    /**
     * back
    * <div class="card-imgBox">
    *     <img class="card-img back-gif" src="./assets/image/fail_loading.svg">
    *     <div class="img-cover">
    *         <div class="img-cover-mask"></div>
    *         <span class="img-cover-overlay" type="button" data-toggle="modal" data-target="#zooming-modal"></span>
    *     </div>
    * </div>
    * */

    _createCard_backApplicationBox () {
        let card_appBox_node = document.createElement("div");
        this._app_fields_text = this.parameters["discipline"];

        this._app_fields_icon = this._app_fields_text.replace(/\s+/g, "-");
        this._app_fields_iconUI = this._app_fields_icon.replace(/[/]/, "-");

        let back_apptitle_html = `<div class="apptitle BackBigTitle">Application Fields</div>`; 
        let app_fields_node = document.createElement("div");
        let app_fields_text_html = `<span class="app-fields-text back-text-content">${this._app_fields_text}</span>`;
        
        let app_fields_icon_html = 
            `<svg style="position:absolute;z-index:-1;"><circle cx="18" cy="13" r="12" fill="${VNS_tag_color[this.parameters["VNS_tag"]]}"/></svg>
            <span class="app-fields-icon">
                <img class="back-app-icon" src="./assets/icon/${this._app_fields_iconUI}.svg">
            </span>`;

        card_appBox_node.classList.add("card-appBox");
        app_fields_node.classList.add("app_fields");
        // img_cover_overlay_node.classList.add("img-cover-overlay");
        // Object.keys(overlay_attr).forEach(
        //     (key, i, keyArray) => img_cover_overlay_node.setAttribute(key, overlay_attr[key])
        // );

        app_fields_node.innerHTML = app_fields_text_html + app_fields_icon_html;
        card_appBox_node.innerHTML = back_apptitle_html;
        card_appBox_node.appendChild(app_fields_node);
        return card_appBox_node;
    }

    // 历史留存，并未调用，仅作参考
    _createCard_backImgBox () {
        let card_imgBox_node = document.createElement("div");
        this._back_gif_name = '';
        // let back_gif_html = `<img class="card-img back-gif" src=${file_exist("./assets/back_gif_s/", [`back_${this.parameters["card_id"]}.gif`, `back_${this.parameters["card_id"]}_${this.parameters["VNS_tag"]}.gif`])} alt="./assets/image/fail_loading.svg">`;  // 缺少反面gif
        let back_gif_html = `<img class="card-img back-gif">`;  // 缺少反面gif
        let img_cover_node = document.createElement("div");
        let img_cover_mask_html = `<div class="img-cover-mask"></div>`;
        // let img_cover_overlay_node = document.createElement("span");
        let img_cover_overlay_html = `<span class="img-cover-overlay" type="button" data-toggle="modal" data-target="#zooming-modal"></span>`;
        // const overlay_attr = {
        //     "type": "button",
        //     "data-toggle": "modal",
        //     "data-target": "#zooming-modal"
        // }

        card_imgBox_node.classList.add("card-imgBox");
        img_cover_node.classList.add("img-cover");
        // img_cover_overlay_node.classList.add("img-cover-overlay");
        // Object.keys(overlay_attr).forEach(
        //     (key, i, keyArray) => img_cover_overlay_node.setAttribute(key, overlay_attr[key])
        // );

        img_cover_node.innerHTML = img_cover_mask_html + img_cover_overlay_html;
        card_imgBox_node.innerHTML = back_gif_html;
        card_imgBox_node.appendChild(img_cover_node);
        return card_imgBox_node;
    }

    /**
     * front
    <div class="card-body">
        <div class="card-body-subtitle">HOW</div>
        <p class="card-body-text">Expand and contract rhythmically.</p>
        <div class="card-body-subtitle">WHY</div>
        <p class="card-body-text">Size contrast is a common way of attracting attention
            and conveying importance.
        </p>
        <div class="card-body-subtitle">Applicable Visualization Techniques</div>
        <p class="card-body-text">Size contrast is a common way of attracting attention
            and conveying importance.
        </p>
    </div>
    */

   //卡片的浅色部分
    _createCard_frontBody () {
        let card_body_node = document.createElement("div");
        let card_frontBody_titleHtml = "";
        let card_frontBody_textHtml = "";
        let card_body_front_textArray = [
            this.parameters["year"],
            this.parameters["venue"],
            this.parameters["link"]
        ];
        

        card_body_node.classList.add("card-body");

        Homepage_Card.card_body_front_titleArray.forEach((title, i, titleList) => {
            if(card_body_front_textArray[i] === "") {
                return ;
            }

            // if(i==0){
            //     card_frontBody_textHtml = `<p class="card-body-text"><b>Year: </b>${card_body_front_textArray[i]}</p>`;
            //     card_body_node.innerHTML+= (card_frontBody_titleHtml + card_frontBody_textHtml); 
            //     return;
            // }
            if(i==1){
                card_frontBody_textHtml = `<p class="card-body-text"><b>Venue: </b>${card_body_front_textArray[i]}</p>`;
                card_body_node.innerHTML+= (card_frontBody_titleHtml + card_frontBody_textHtml); 
                return;
            }
            if(i==2){
                card_frontBody_textHtml = `<p class="card-body-text"><b>Link: </b><a classname="caselink" href=${card_body_front_textArray[i]}  target="_blank">URL 🔗</a></p>`;
                card_body_node.innerHTML+= (card_frontBody_titleHtml + card_frontBody_textHtml); 
                return;
            }

        });
        
        return card_body_node;
    }

    /**
     * back
     * <div class="card-body">
     *      <h6 class="card-body-subtitle">Inequality: how wealth is distributed in the UK - animated video</h6>
     *      <div class="card-body-caption">
     *          <div><span>venue: </span>The Guardian</div>
     *          <div><span>Year: </span>2013</div>
     *          <div><span>Category: </span>Social Sciences</div>
     *          <div><span>Subcategory: </span>Economics</div>
     *      </div>
     *  </div>
     */
    _createCard_backBody () {
        let card_backtype_node = document.createElement("div");
        this._type_text = this.parameters["type"];

        // this._app_fields_icon = this._app_fields_text.replace(/\s+/g, "-");


        let back_typetitle_html = `<div class="apptitle BackBigTitle">Contribution Types</div>`; 
        let app_fields_node = document.createElement("div");
        let app_fields_text_html = `<span class="app-fields-text back-text-content">${this._type_text}</span>`;
        

        card_backtype_node.classList.add("card-typebox");
        app_fields_node.classList.add("app_fields");

        let back_codetitle_html = `<div class="apptitle BackBigTitle">Codes</div>`; 

        app_fields_node.innerHTML = app_fields_text_html;
        card_backtype_node.innerHTML = back_typetitle_html;
        card_backtype_node.appendChild(app_fields_node);

        return card_backtype_node;
    }

    _createCard_backCode () {
        let card_backcodes_node = document.createElement("div");
        this._type_text = this.parameters["type"];

        // this._app_fields_icon = this._app_fields_text.replace(/\s+\//g, "-");

        let back_codetitle_html = `<div class="apptitle BackBigTitle">Codes</div>`; 

        let app_fields_node = document.createElement("div");
        let app_fields_text_html = `
        <div class="codes-left">
            <div class="codes-title">Input Modality</div>
            <div class="back-text-content">${this.parameters["Input Modality"]}</div>
            <div class="codes-title">Computational method</div>
            <div class="back-text-content">${this.parameters["Computational Method"]}</div>
            <div class="codes-title">User Groups</div>
            <div class="back-text-content">${this.parameters["User Groups"]}</div>
        </div>
         <div class="codes-right">
            <div class="codes-title">Influence</div>
            <div class="back-text-content">${this.parameters["Influence"]}</div>
            <div class="codes-title">AI Action</div>
            <div class="back-text-content">${this.parameters["AI Action"]}</div>
            <div class="codes-title">Scope</div>
            <div class="back-text-content">${this.parameters["Scope"]}</div>
        </div>
        
        `;
        

        card_backcodes_node.classList.add("card-body", "card-codebox");
        app_fields_node.classList.add("back-codes");

        app_fields_node.innerHTML = app_fields_text_html;
        card_backcodes_node.innerHTML = back_codetitle_html;
        card_backcodes_node.appendChild(app_fields_node);

        return card_backcodes_node;
    }


    _createCard_footer (direction = 1) {

        let left_html = "";
        let button_text = "";
        let card_footer_bottom_html = "";
        let card_footer_bottom_icon_html = "";
        let card_footer_node = document.createElement("div");
        let card_footer_bottom_node = document.createElement("span");

        if(direction > 0) {
            // positive
            left_html = `<span class="card-footer-num">NO. ${this.parameters["card_id"]}</span>`;
            button_text = "View details";
        } else {
            // negative
            // left_html = `<a href="${this.parameters["eg_url"]}" target="_blank"><span class="card-footer-url"></span>URL</a>`;
            left_html = `<span class="card-footer-num">NO. ${this.parameters["card_id"]}</span>`;
            button_text = "Back to front";
        }
        
        card_footer_bottom_html = `<button class="card-footer-bottom">${button_text}</button>`;
        card_footer_node.classList.add("card-footer");

        card_footer_node.innerHTML = left_html + card_footer_bottom_html;
        return card_footer_node;

        // if(direction > 0) {
        //     // positive
        //     left_html = `<span class="card-footer-num">NO. ${this.parameters["card_id"]}</span>`;
        //     button_text = " ";
        // } 
        // else {
        //     // negative
        //     left_html = ``;
        //     button_text = "";
        // }
        
        // card_footer_bottom_html = `<div class="card-footer-bottom-chart">${this.parameters["Chart_tag"]}</div>`;
        // card_footer_bottom_icon_html = `<div class="${this.parameters["Chart_tag"].replace(/\s+/g, "-")}"></div>`;
        // card_footer_node.classList.add("card-footer");

        // card_footer_bottom_node.classList.add("card-footer-child");

        // card_footer_node.innerHTML = left_html;
        // card_footer_bottom_node.innerHTML =  card_footer_bottom_icon_html + card_footer_bottom_html;
        // // card_footer_node.appendChild(card_footer_bottom_node);

        // return card_footer_node;
    }
}


//这里把card的json传进来了
Homepage_Card.card_body_front_titleArray = ["HOW","year","link"];
Homepage_Card.caption_keyArr = ["venue", "Year", "Category", "Subcategory"];

Homepage_Card.prototype._bindEvents = function () {

    let that = this;
    const this_card_node = this._deck_single_node;
    const card_inner_node = this_card_node.querySelector(".card-inner");
    const front_trans_button = card_inner_node.querySelector(".front .card-footer-bottom");
    const back_trans_button = card_inner_node.querySelector(".back .card-footer-bottom");
    const front_img = card_inner_node.querySelector(".front .card-frontImg");
    // const front_preview_img = this_card_node.querySelector("img.front-preview");
    // const back_img_box = this_card_node.querySelector(".card-imgBox");
    // const back_img_cover = back_img_box.querySelector(".img-cover");
    // const back_gif_zooming = back_img_cover.querySelector(".img-cover-overlay");
    const modal_title_node = document.querySelector(".modal-title");

    // card footer button
    front_trans_button.addEventListener("click", () => {
        if(!card_inner_node.classList.contains("turned-over")) {
            card_inner_node.classList.add("turned-over");
        }
    });
    back_trans_button.addEventListener("click", () => {
        if(card_inner_node.classList.contains("turned-over")) {
            card_inner_node.classList.remove("turned-over");
        }
    });

    // card footer URL
    $(card_inner_node.querySelector(".card-footer a")).tooltip({ title: "watch full video" });

    //鼠标hover的时候，动图gif出现并播放
    // front gif static preview
    // front_img.addEventListener("mouseover", () => {
    //     front_img.querySelector("img.front-gif").style.visibility = "none";
    //     $(front_img).find("img.front-preview").fadeTo("fast", 0);
    // });
    // front_img.addEventListener("mouseout", () => {
    //     front_img.querySelector("img.front-gif").style.visibility = "block";
    //     $(front_img).find("img.front-preview").fadeTo("fast", 1);
    // });

    // back gif zooming in modal window
    // $(back_img_box).hover(
    //     function () {
    //         $(back_img_cover).fadeTo("fast", 1);
    //     },
    //     function () {
    //         $(back_img_cover).fadeTo("fast", 0);
    //     }
    // );

    // // modal window
    // $(back_gif_zooming).tooltip({ title: "zoom in" });
    // back_gif_zooming.addEventListener("click", () => {
    //     $('#zooming-modal').modal({
    //         backdrop: true,
    //         keyboard: false,
    //         focus: true,
    //         show: true
    //     });

    //     document.querySelector(".modal-body > img").setAttribute("src", `./assets/back_gif_s/${this._back_gif_name}`);
    //     document.querySelector(".modal-content").classList.add(this.parameters["VNS_tag"]);
    //     modal_title_node.innerText = this.parameters["eg_title"];
    //     modal_title_node.setAttribute("href", this.parameters["eg_url"]);
    // });
    // $('#zooming-modal').on('show.bs.modal', function() {
    //     let img = new Image();
    //     img.src = `./assets/back_gif_s/${that._back_gif_name}`;
    //     document.querySelector(".modal-title").innerHTML = that.parameters["card_title"];
    //     $(img).on("load", function(){$(".modal-body > img").replaceWith(img);});
    // });

}

// 把每张小卡片渲染出来
Homepage_Card.prototype.appendTo = function (parentNode) {
    if(!(parentNode instanceof HTMLElement)) {
        console.error(`${parentNode} is not a DOM node!`);
        return false;
    }

    this._deck_single_node = this._createCard();
    this._bindEvents();
    
    parentNode.appendChild(this._deck_single_node);
    return true;
}



// homepage reminder class
class Homepage_Reminder {
    constructor({VNS_tag, VNS_desc, VNS_num, VNS_clustername}) {
        this._VNS_tag = VNS_tag + "";
        this._VNS_num = VNS_num + "";
        this._VNS_desc = VNS_desc + "";
        this._VNS_clustername = VNS_clustername + "";
    }
    
    //在这里创建主页中C1等大标题
    _createReminder (methodToReminderTitle = str => str) {
        let reminder_node = document.createElement("div");
        let reminder_bg_node = document.createElement("div");
        let reminder_content_node = document.createElement("div");
        let reminder_head_node = document.createElement("div");
        let reminder_desc_node = document.createElement("div");
        let reminder_symbol_html = `<span class="reminder-symbol"></span>`;
        let reminder_title_html = `<span class="reminder-title">${methodToReminderTitle(this._VNS_clustername)}&nbsp;</span>
            <span class='reminder-sum'>(${this._VNS_num})</span>
            <span class='reminder-sum-s'>SUM: ${this._VNS_num}</span>`;
        

        reminder_node.classList.add(this._VNS_tag);
        reminder_node.setAttribute("id", this._VNS_tag);
        if (this._VNS_tag === "C1" || this._VNS_tag === "C4" || this._VNS_tag === "C7" || this._VNS_tag === "C10" || this._VNS_tag === "C13" || this._VNS_tag === "C14") {
            reminder_node.classList.add("display-reminder-section");
        } else {
            reminder_node.classList.add("display-reminder");
        }
        reminder_bg_node.classList.add("reminder-bg");
        reminder_content_node.classList.add("reminder-content");
        // reminder_node.classList.add("display-reminder", "active-sticky");
        reminder_head_node.classList.add("reminder-head");
        reminder_desc_node.classList.add("reminder-desc");

        reminder_head_node.innerHTML = reminder_symbol_html + reminder_title_html;
        reminder_desc_node.innerHTML = this._VNS_desc;
        reminder_content_node.appendChild(reminder_head_node);
        reminder_content_node.appendChild(reminder_desc_node);
        reminder_node.appendChild(reminder_bg_node);
        reminder_node.appendChild(reminder_content_node);
        return reminder_node;
    }
}

Homepage_Reminder.prototype._bindEvents = function () {
    let that = this;
    // scroll
    const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");
    // const reminder_bg_node = reminder_node.querySelector(".reminder-bg");
    
    
    const event_callback = function () {
        if(that._reminder_node) {
            const reminder_node = that._reminder_node;
            
            if(reminder_node.nextElementSibling) {
                const card_deck_node = reminder_node.nextElementSibling;

                let distance_to_top = card_deck_node.getBoundingClientRect().top - reminder_node.getBoundingClientRect().bottom;
                // console.log(distance_to_top);
                if(distance_to_top < 3 && !reminder_node.classList.contains("active-sticky")) {
                    reminder_node.classList.add("active-sticky");
                } else if(distance_to_top >= 3 && reminder_node.classList.contains("active-sticky")) {
                    reminder_node.classList.remove("active-sticky");
                }
    
            // if(reminder_node.nextElementSibling && reminder_node.querySelector(".reminder-title").innerHTML == "Emphasis (15)" ) {
                let distance_to_bottom = card_deck_node.getBoundingClientRect().bottom - reminder_node.getBoundingClientRect().top;
                // if ((distance_to_bottom < CARD_DISPLAY_NODE.offsetHeight * 0.5) && !reminder_node.classList.contains("hidden-sticky")) {
                if ((distance_to_bottom < CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.1) && !reminder_node.classList.contains("hidden-sticky")) {
                    reminder_node.classList.add("hidden-sticky");
                    // console.log(distance_to_bottom)
                // } else if ((distance_to_bottom >= CARD_DISPLAY_NODE.offsetHeight * 0.5) && reminder_node.classList.contains("hidden-sticky")) {
                } else if ((distance_to_bottom >= CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.1) && reminder_node.classList.contains("hidden-sticky")) {
                    reminder_node.classList.remove("hidden-sticky");
                }
            }
        }
        
    }

    event_callback();
    // CARD_DISPLAY_NODE.addEventListener("scroll", event_callback);
    CARD_DISPLAY_NODE.parentElement.addEventListener("scroll", event_callback);
}

Homepage_Reminder.prototype.appendTo = function (methodToReminderTitle) {
    // if(!(parentNode instanceof HTMLElement) || !(nextNode instanceof HTMLElement)) {
    //     console.error(`Either ${parentNode} or ${nextNode} is not a DOM element!`);
    //     return false;
    // }

    this._reminder_node = this._createReminder(methodToReminderTitle);
    this._bindEvents();

    // parentNode.insertBefore(this._reminder_node, nextNode);
    return this._reminder_node;
}


export {
    Homepage_Card as Homepage_Card,
    Homepage_Reminder as Homepage_Reminder
};