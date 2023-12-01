package main

import (
	"fmt"
	"os"
)

func main() {
	// Specify the directory path where you want to create the folders
	dirPath := "C:\\Users\\adi\\Desktop\\advent-of-code"

	// Create folders
	for i := 1; i <= 25; i++ {
		// Format the folder name with leading zero if i is less than 10
		folderName := fmt.Sprintf("%02d", i)

		// Concatenate the directory path and folder name
		folderPath := fmt.Sprintf("%s/%s", dirPath, folderName)

		// Create the folder
		err := os.Mkdir(folderPath, os.ModeDir)
		if err != nil {
			fmt.Println("Error creating folder:", err)
			return
		}
		fmt.Println("Folder created:", folderPath)
	}
}
