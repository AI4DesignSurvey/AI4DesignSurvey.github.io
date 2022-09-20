/* JS for tab "homepage" Visual Narrative Strategies panel & Editorial Layers */
import { VNS_click_callback, VNS_scroll_callback, EL_callback } from './hp_middle.js';

class Homepage_Panel {

    constructor (btn_json_url, panel_title, btn_name_tag_template, panel_name, click_event_callback = () => {}, 
        global_event_listener = () => {}) {

        this._btn_json_url = btn_json_url + "";
        this._panel_title = panel_title + "";
        this._btn_name_tag_template = btn_name_tag_template + "";
        this._panel_name  = panel_name + "";
        this._btn_queue = [];  // save btn items
        this._click_event_callback = click_event_callback;
        this._global_event_callback = global_event_listener || function() {};
        // if(this._btn_json_url.substring(this._btn_json_url.length-7) !== ".json") {
        //     console.error("Please check your URL format (.JSON)!");
        //     return ;
        // }
    }


    _createPanel (extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName) {
        let panel_node = document.createElement("div");
        // let panel_chart_title_html = `<h3 class="sidebar-panel-title">Chart Types</h3>`;

        let panel_title_html = `<h3 class="sidebar-panel-title">${this._panel_title}</h3>`;

        let panel_group_node = document.createElement("div");

        panel_node.classList.add("sidebar-panel");
        panel_node.setAttribute("id", this._panel_name.concat("-panel"));
        panel_group_node.classList.add("sidebar-panel-group");

        let pre_title = '';
        // $.ajaxSettings.async = false;
        $.getJSON(this._btn_json_url, json => {
            let selectList = [];
            json.forEach((item, i, jsonArr) => {
                if (json[i]["EL_type"] === "title") {
                    let btn_node = this._createButtonChild(selectList, extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName, pre_title);
                    if (selectList.length > 0) {
                        this._appendTo_queue(btn_node); // append btn to panel queue
                        panel_group_node.appendChild(btn_node);
                        selectList = [];
                    }

                    btn_node = this._createButton(item, extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName);
                    this._appendTo_queue(btn_node); // append btn to panel queue
                    panel_group_node.appendChild(btn_node);
                    pre_title = item["EL_tag"];
                } else {
                    selectList.push(item);
                }
            });
            let btn_node = this._createButtonChild(selectList, extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName, pre_title);
            if (selectList.length > 0) {
                this._appendTo_queue(btn_node); // append btn to panel queue
                panel_group_node.appendChild(btn_node);
                selectList = [];
            }
            
            this._bindClickEvents(this._click_event_callback);
            this._bindOtherListenerEvents(this._global_event_callback);
        });

        panel_node.innerHTML = panel_title_html;
        panel_node.appendChild(panel_group_node);
        return panel_node;
    }

    _createButton (json_item, extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName) {
        json_item = json_item || {};

        if((typeof json_item !== "object") 
            || (typeof extraNode_html !== "string")
            || !(extraClass_toA_arr instanceof Array)
            || (typeof extraAttribute_toA !== "object")
        ) {
            console.error("Parameter(s) error! Button creation failed.");
            return document.createElement("a");
        }

        let btn_node = document.createElement("div");
        let btn_symbol_html = `<span class="${this._panel_name}-btn-symbol}"></span>`;
        let btn_text_html = `<span class="${this._panel_name}-btn-text">
            ${this._get_reg_template(this._btn_name_tag_template, json_item, methodToBtnName)}</span>`;

        // btn_node.classList.add("sidebar-btn", this._panel_name.concat("-btn"));
        btn_node.classList.add("dimension", this._panel_name.concat("-btn"));

        if(extraClass_toA_arr) {
            extraClass_toA_arr.forEach((class_name, i, class_arr) => {
                if(typeof class_name != "string") {
                    return false;
                }

                if(class_name.search(Homepage_Panel.btn_name_regex) > -1) {
                    class_name = this._get_reg_template(class_name, json_item, str => str.replace(/\s+/g, "-"));
                }
                btn_node.classList.add(class_name);
            });
        }
        
        //控制滚动的
        if(Object.keys(extraAttribute_toA).length > 0) {
            for (let attr in extraAttribute_toA) {
                let value = extraAttribute_toA[attr];
                if(typeof value !== "string") continue;
                value = value || "";
                if(Object.keys(json_item).indexOf(value) > -1) {
                    value = json_item[value];
                }

                if(value.search(Homepage_Panel.btn_name_regex)) {
                    value = this._get_reg_template(value, json_item);
                }
                btn_node.setAttribute(attr, value);
            }
        }

        btn_node.innerHTML = btn_symbol_html + btn_text_html + extraNode_html;
        return btn_node;
    }
    // 创建筛选，每一类别的高中低
    _createButtonChild (json_item, extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName, title) {
        json_item = json_item || [];

        if((typeof extraNode_html !== "string")
            || !(extraClass_toA_arr instanceof Array)
            || (typeof extraAttribute_toA !== "object")
        ) {
            console.error("Parameter(s) error! Button creation failed.");
            return document.createElement("a");
        }

        let btn_node = document.createElement("div");
        let btn_symbol_html = `<span class="${this._panel_name}-btn-line"></span>`;
        for (let i = 0; i < json_item.length; i++) {
            let btn = document.createElement("button");
            btn.classList.add("btn", this._panel_name.concat("-btn"), "active");
            btn.style.padding = 0;
            btn.style.fontSize = "0.8rem";
            btn.setAttribute("title", title);
            if (i === 0) {
                btn.style.borderTopLeftRadius = "15px";
                btn.style.borderBottomLeftRadius = "15px";
                btn.style.borderRightWidth = "3px";
                btn.style.borderRightStyle = "solid";
                btn.style.borderRightColor = "#ffffff";
            } else if (i === json_item.length - 1) {
                btn.style.borderTopRightRadius = "15px";
                btn.style.borderBottomRightRadius = "15px";
                btn.style.borderLeftWidth = "2px";
                btn.style.borderLeftStyle = "solid";
                btn.style.borderLeftColor = "#ffffff";
            }
            btn.innerHTML = `${this._get_reg_template(this._btn_name_tag_template, json_item[i], methodToBtnName)}`;
            btn_node.appendChild(btn);
        }

        btn_node.classList.add(this._panel_name.concat("-btn"), "couldselect", "btn-group");
        
        // if(extraClass_toA_arr) {
        //     extraClass_toA_arr.forEach((class_name, i, class_arr) => {
        //         if(typeof class_name != "string") {
        //             return false;
        //         }

        //         if(class_name.search(Homepage_Panel.btn_name_regex) > -1) {
        //             class_name = this._get_reg_template(class_name, json_item, str => str.replace(/\s+/g, "-"));
        //         }
        //         btn_node.classList.add(class_name);
        //     });
        // }
        
        //控制滚动的
        if(Object.keys(extraAttribute_toA).length > 0) {
            for (let attr in extraAttribute_toA) {
                let value = extraAttribute_toA[attr];
                if(typeof value !== "string") continue;
                value = value || "";
                if(Object.keys(json_item).indexOf(value) > -1) {
                    value = json_item[value];
                }

                if(value.search(Homepage_Panel.btn_name_regex)) {
                    value = this._get_reg_template(value, json_item);
                }
                btn_node.setAttribute(attr, value);
            }
        }

        btn_node.innerHTML += btn_symbol_html + extraNode_html;
        return btn_node;
    }

    // deal with single button name template
    // this._btn_name_tag = "${regex01:Comparison} (${regex02:8})"
    // _get_btn_template (json_item = {}) {
    //     let btn_name_pairs = this._btn_name_tag_template;
    //     btn_name_pairs.replace(Homepage_Panel.btn_name_regex, (all_match, match_inner, i) => {
    //         if(Object.keys(json_item).indexOf(match_inner) > -1) {
    //             return json_item[match_inner];
    //         }
    //         return "tag_" + i;
    //     });

    //     return btn_name_pairs;
    // }
    // 
    // deco: decorate json_item values
    _get_reg_template (pairs, json_item = {}, deco = function (str) {return str;}) {
        let temp_pairs = pairs + "";
        temp_pairs = temp_pairs.replace(Homepage_Panel.btn_name_regex, (all_match, match_inner, i) => {
            if(Object.keys(json_item).indexOf(match_inner) > -1) {
                return deco(json_item[match_inner]);
            }
            return "tag_" + i;
        });
        return temp_pairs;
    }

    _appendTo_queue (btn_node) {
        if(!(btn_node instanceof HTMLElement)) {
            console.error("This button item is not a HTML Element!");
            return false;
        }
        this._btn_queue.push(btn_node);
    }

    _bindClickEvents (callback = () => {}) {
    // _bindEvents () {
        // console.log("EL binding...");
        this._btn_queue.forEach((btn, i, btn_queue) => {
            for (let b of btn.childNodes) {
                b.addEventListener("click", () => {
                    // if(btn.classList.contains("active")) {
                    //     btn.classList.remove("active");
                    // } else {
                    //     btn.classList.add("active");
                    // }
                    callback(b);
                });
            }
        });
    }

    _bindOtherListenerEvents (callback = () => {}) {
        // const panel_node = this._panel_node.querySelector(".sidebar-panel-group");
        callback ();
    }
}

Homepage_Panel.btn_name_regex = /\$\{(.*?)\}/gm;

Homepage_Panel.prototype.appendTo = function (parentNode, extraNode_html, extraClass_toA_arr, extraAttribute_toA, 
    methodToBtnName) {

    extraNode_html = extraNode_html || "";
    extraClass_toA_arr = extraClass_toA_arr || [];
    extraAttribute_toA = extraAttribute_toA || {};
    if(!(parentNode instanceof HTMLElement)
        || (typeof extraNode_html !== "string")
        || !(extraClass_toA_arr instanceof Array)
        || (typeof extraAttribute_toA !== "object")
    ) {
        console.error("Parameter(s) error! Panel creation failed.");
        return false;
    }

    this._panel_node = this._createPanel(extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName);
    // this._panel_node2 = this._createPanel2(extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName);

    parentNode.appendChild(this._panel_node);
    // parentNode.appendChild(this._panel_node2);
    return true;
}

// VNS callback



// const homepage_vns_url = "./assets/json/vns_collection.json";
// const vns_panel_title = "AI Assisting Designers";
// const vns_panel_title2 = "Designers Assisting AI";
// const vns_btn_name_template = "${VNS_clustername} (${VNS_num})";
// const vns_panel_name = "scrollSpy";
// let VNS_panel = new Homepage_Panel(homepage_vns_url, vns_panel_title, vns_panel_title2, vns_btn_name_template, 
//     vns_panel_name, VNS_click_callback, VNS_scroll_callback);






const homepage_el_url = "./assets/json/el_collection.json";
const el_panel_title = " Characteristics";
const el_btn_name_template = "${EL_tag}";
const el_panel_name = "filter";
const EL_panel = new Homepage_Panel(homepage_el_url, el_panel_title,  
    el_btn_name_template, el_panel_name, EL_callback);




export {
    // VNS_panel as VNS_panel,
    // Chart_panel as Chart_panel,
    EL_panel as EL_panel
};
