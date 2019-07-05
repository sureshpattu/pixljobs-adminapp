Handlebars.registerPartial("job_card_row", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <div class=\"panel main_card_sec js_main_card_sec\" data-job-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-recruiter-id=\""
    + alias4(((helper = (helper = helpers.recruiter_id || (depth0 != null ? depth0.recruiter_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recruiter_id","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"panel-heading\">\n            <div class=\"row\">\n                <div class=\"col-md-8\">\n                    <a data-toggle=\"collapse\" class=\"panel-title collapsed js_panel_title\"\n                       data-parent=\"#accordion\"\n                       href=\"#collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                        <div class=\"title_sec\">\n                            <span class=\"highlights\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                            <span class=\"small_txt\">5+ years</span>\n                            <img src=\"/img/icons/arrow-down-small.svg\" alt=\"\" class=\"icon_arrow_down\">\n                        </div>\n                        <div class=\"sub_title_sec\">\n                            <span class=\"small_txt\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + ", "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.city : stack1), depth0))
    + ",</span>\n                        </div>\n                    </a>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"cta_wrap\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"===","published",{"name":"ifCond","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "                        <a class=\"btn  js_reject_job\" data-type=\"rejected\">Reject</a>\n                        <input type=\"hidden\" class=\"js_qa_job_title\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                        <input type=\"hidden\" class=\"js_qa_job_id\" value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n            <div class=\"panel-body\">\n                <div class=\"job_card\">\n                    <div class=\"job_sec\">\n                        <div class=\"job_tags\">\n                            <div class=\"row\">\n                                <div class=\"col-md-9 col-xs-12\">\n                                    <div class=\"tags_wrap spl_wrap\">\n                                        <div class=\"tags\">\n                                            <img src=\"/img/icons/dollar.svg\" class=\"dollar_icons\">\n                                            "
    + alias4(((helper = (helper = helpers.salary_min || (depth0 != null ? depth0.salary_min : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"salary_min","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.salary_max || (depth0 != null ? depth0.salary_max : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"salary_max","hash":{},"data":data}) : helper)))
    + "\n                                        </div>\n                                        <div class=\"tags\">\n                                            <img src=\"/img/icons/calendar.svg\" class=\"cal_icons\">\n                                            "
    + ((stack1 = (helpers.countDateTime || (depth0 && depth0.countDateTime) || alias2).call(alias1,(depth0 != null ? depth0.created_at : depth0),{"name":"countDateTime","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                                        </div>\n                                        <div class=\"tags \">\n                                            <img src=\"/img/icons/location.svg\" class=\"loc_icons\">\n                                            "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.city : stack1), depth0))
    + "\n                                        </div>\n                                        <div class=\"tags\">\n                                            <img src=\"/img/icons/place.svg\" class=\"place_icons\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.location_type : depth0),"===","office",{"name":"ifCond","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-3 col-xs-12\">\n                                    <div class=\"tags_wrap\">\n                                        <div class=\" tags btn_wrap\">\n                                            <a href=\"#\" class=\"post_tag\">\n                                                Frontend\n                                            </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"work_sec\">\n                        <div class=\"row row_c\">\n                            <div class=\"col-md-4 col_bordered\">\n                                <div class=\"option\">TYPE:\n                                    <span class=\"option_val\">"
    + alias4(((helper = (helper = helpers.job_type || (depth0 != null ? depth0.job_type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"job_type","hash":{},"data":data}) : helper)))
    + "</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-4 col_bordered\">\n                                <div class=\"option\">\n                                    WORKWEEK:\n                                    <span class=\"option_val\">"
    + alias4(((helper = (helper = helpers.work_week || (depth0 != null ? depth0.work_week : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"work_week","hash":{},"data":data}) : helper)))
    + " hours</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-4 col_bordered\">\n                                <div class=\"option\">\n                                    HOLIDAY:\n                                    <span class=\"option_val\">"
    + alias4(((helper = (helper = helpers.holidays || (depth0 != null ? depth0.holidays : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"holidays","hash":{},"data":data}) : helper)))
    + " days</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"job_desc\">\n                        <div class=\"desc_details\">\n                            <div class=\"about_sec\">\n                                <div class=\"desc_title\">\n                                    About the work\n                                </div>\n                                <div class=\"desc\">\n                                    "
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + "\n                                </div>\n                            </div>\n                            <div class=\"requirement_sec\">\n                                <div class=\"desc_title\">\n                                    Requirements\n                                </div>\n                                <div class=\"desc\">\n                                    <ul class=\"requirement_list\">\n                                        <li class=\"requirement_line\">Lorem ipsum dolor sit amet, consectetur\n                                            adipiscing elit,\n                                        </li>\n                                        <li class=\"requirement_line\">ed do eiusmod tempor</li>\n                                        <li class=\"requirement_line\">incididunt ut labore et dolore magna\n                                            aliquaelementum eu facilisis\n                                            sed\n                                        </li>\n                                        <li class=\"requirement_line\">odio morbi. Auctor eu augue ut lectus.\n                                            Lacus vestibulum sed arcu\n                                            non.\n                                            Leo in\n                                            vitae\n                                            turpis massa sed elementum tempus egestas. Vitae congue eu.\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"tech_details\">\n                        <div class=\"tech_sec\">\n                            <div class=\"desc_title\">\n                                Technologies\n                            </div>\n                            <div class=\"desc\">\n                                <div class=\"row\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.qa_job_technologies : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"about_company_card\">\n                    <div class=\"company_desc\">\n                        <div class=\"about_sec\">\n                            <div class=\"desc_title\">\n                                About Company\n                            </div>\n                            <div class=\"desc\">\n                                "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.about : stack1), depth0))
    + "\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"about_work_sec\">\n                        <div class=\"row row_c\">\n                            <div class=\"col-md-6 col_bordered\">\n                                <div class=\"option\">COMPANY SIZE:\n                                    <span class=\"option_val\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.size : stack1), depth0))
    + "</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-6 col_bordered\">\n                                <div class=\"option\">\n                                    INDUSTRY:\n                                    <span class=\"option_val\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.industry : stack1)) != null ? stack1.name : stack1), depth0))
    + "</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"company_desc\">\n                        <div class=\"about_sec\">\n                            <div class=\"desc_title\">\n                                Benefits\n                            </div>\n                            <div class=\"desc benefits_desc\">\n                                <div class=\"row\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.company_benefits : stack1),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"cta_wrap\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"===","published",{"name":"ifCond","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "                    <a class=\"btn  js_reject_job\" data-type=\"rejected\">Reject</a>\n                </div>\n            </div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                            <a class=\"btn btn_blue js_unpublish_job\" data-type=\"pending\">Un-publish</a>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                            <a class=\"btn btn_blue js_publish_job \" data-type=\"published\">Publish</a>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "";
},"8":function(container,depth0,helpers,partials,data) {
    return "                                                On Site\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                                                Remote\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                                        <div class=\"col-md-6\">\n                                            <div class=\"row\">\n                                                <div class=\"col-md-6 col-xs-6\">\n                                                    <div class=\"tech_name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.technology : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>\n                                                </div>\n                                                <div class=\"col-md-6 col-xs-6\">\n                                                    <div class=\"filled_bar\"></div>\n                                                    <div class=\"filled_bar\"></div>\n                                                    <div class=\"empty_bar\"></div>\n                                                </div>\n                                            </div>\n                                        </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                                        <div class=\"col-md-6\">\n                                            <div class=\"circle_wrap\">\n                                                <div class=\"circle_tick\">\n                                                    <img src=\"/img/icons/tick.svg\" class=\"icons tick\">\n                                                </div>\n                                                <div class=\"title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.benefit : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>\n                                            </div>\n                                        </div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "                        <a class=\"btn btn_blue js_unpublish_job\" data-type=\"pending\">Un-publish</a>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "                        <a class=\"btn btn_blue js_publish_job \" data-type=\"published\">Publish</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true}));

Handlebars.registerPartial("notification_card_row", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"panel main_card_sec js_main_card_sec\">\n        <div class=\"panel-heading\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <a data-toggle=\"collapse\" class=\"panel-title collapsed js_panel_title "
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "\" data-notification_id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                       data-parent=\"#accordion\"\n                       href=\"#collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                        <div class=\"title_sec\">\n                            <span class=\"highlights\">"
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.qa_job : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span>\n\n                            <img src=\"/img/icons/arrow-down-small.svg\" alt=\"\" class=\"icon_arrow_down\">\n                            "
    + ((stack1 = (helpers.truncateText || (depth0 && depth0.truncateText) || alias2).call(alias1,(depth0 != null ? depth0.msg : depth0),20,{"name":"truncateText","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n                        </div>\n                    </a>\n                </div>\n            </div>\n        </div>\n        <div id=\"collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n            <div class=\"panel-body\">\n                <div class=\"job_card\">\n                    <div class=\"job_sec\">\n                        <div class=\"job_tags\">\n                            <span class=\"small_txt\">"
    + alias4(((helper = (helper = helpers.msg || (depth0 != null ? depth0.msg : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"msg","hash":{},"data":data}) : helper)))
    + "</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true}));

Handlebars.registerPartial("page_loader", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "            "
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"loader_table\">\n                <div class=\"loader_table_cell\">\n                    <img src=\"/img/loading.svg\" class=\"loader_img\">\n                </div>\n            </div>\n            <h2 class=\"hd_title\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data}) : helper)))
    + "</h2>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"cd-popup is-visible page_loader_popup\" role=\"alert\" id=\"windowLoaderPopup\">\n    <div class=\"cd-popup-container\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.html : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("popup", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"cd-popup is-visible "
    + container.escapeExpression(((helper = (helper = helpers.theme || (depth0 != null ? depth0.theme : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme","hash":{},"data":data}) : helper)))
    + "\" role=\"alert\" id=\"windowPopup\">\n    <div class=\"cd-popup-container\">\n        "
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        <a href=\"#0\" class=\"cd-popup-close\">\n            &times;\n        </a>\n    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("reason_form", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"reason_form_popup jsReasonForm\">\n    <div class=\"form-group\">\n        <label>Reason</label>\n        <textarea class=\"form-control js_reason\" rows=\"5\"></textarea>\n    </div>\n    <button type=\"submit\" class=\"btn btn_blue\">Submit</button>\n</form>";
},"useData":true}));