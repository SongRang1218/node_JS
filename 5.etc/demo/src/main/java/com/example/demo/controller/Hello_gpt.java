package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Hello_gpt {

   @GetMapping(value = "/")
   public String Home(Model model) {
       // 단일 속성을 추가할 때는 addAttribute 메서드를 사용합니다.
       model.addAttribute("test", "안녕하세요");
       return "hello"; // 템플릿 파일 이름으로 'hello'를 반환합니다.
   }
}
