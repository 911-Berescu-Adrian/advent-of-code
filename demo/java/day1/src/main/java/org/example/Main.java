package org.example;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

public class Main {
    private static Pattern pattern = Pattern.compile("-?\\d+(\\.\\d+)?");

    public static boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        return pattern.matcher(strNum).matches();
    }
    public static void main(String[] args) throws InterruptedException {
        long startTime = System.currentTimeMillis();
        String filepath = "input.txt";
        try{
            List<String> lines = Files.readAllLines(Paths.get(filepath), StandardCharsets.UTF_8);
            int currentCalories = 0;
            ArrayList<Integer> array = new ArrayList<>();
            array.add(0);
            array.add(0);
            array.add(0);

            for(String line: lines) {
                if(isNumeric(line)) {
                    currentCalories += Integer.parseInt(line);
                }
                else {
                    for (int i = 0; i < array.size(); i++) {
                        if (currentCalories > array.get(i)) {
                            Collections.rotate(array.subList(i, array.size()), 1);
                            array.set(i, currentCalories);
                            break;
                        }
                    }
                    currentCalories = 0;
                }
            }
            int sum = array.stream().mapToInt(Integer::intValue).sum();
            System.out.println(sum);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        long endTime = System.currentTimeMillis();
        long timePassed = endTime - startTime;
        System.out.println(timePassed + " ms");
    }
}