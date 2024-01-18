package com.damian.fishtank.backend.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessagesController {

    	@Value("${security.jwt.token.secret-key:XXX}")
		private String secretKey;
		// System.out.print(secretKey);

    @GetMapping("/messages")
    public ResponseEntity<List<String>> messages() {
        return ResponseEntity.ok(Arrays.asList("first", "second",secretKey));
    }

//     @GetMapping("/messages")
//    public ResponseEntity<List<String>> messages() {
//         return ResponseEntity.ok(Arrays.asList("first", "second"));
//     }
}
