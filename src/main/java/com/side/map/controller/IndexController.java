package com.side.map.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    

    @Value("${google-map-api.key}")
    public String googleMapApiKey;


    @GetMapping("/")
    public String indexPage(ModelMap modelMap) {
        modelMap.addAttribute("googleMapApiKey", googleMapApiKey);
        return "/index";
    }
}
