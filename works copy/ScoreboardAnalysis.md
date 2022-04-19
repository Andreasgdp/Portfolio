---
title: 'Scoreboard Analysis'
year: '2019'
platform: 'windows'
stack: 'Python, YOLOv4, Tesseract-OCR, Deep Learning'
source: 'https://github.com/AceBenson/Scoreboard-Analysis'
abstract: 'Detect bounding box of scoreboard and digits by YOLO, and then recoginize the scores by Tesseract-OCR.'
category: 'Computer Vision'
image: '/images/works/scoreboard-analysis.png'
video:
  - '/videos/works/scoreboard-detection.mp4'
  - '/videos/works/scoreboard-analysis.mp4'
---

<Box>
  There are three stage in this project: **scoreboard detection**, **digit detection**, and **digit recoginition**.
  <List m={4}>
    <ListItem><Badge mr={2}>stage-1</Badge>Scoreboard Detection: Implemented by YOLO</ListItem>
    <ListItem><Badge mr={2}>stage-2</Badge>Digit Detection: Implemented by YOLO</ListItem>
    <ListItem><Badge mr={2}>stage-3</Badge>Digit Recognition: Implemented by Tesseract-OCR</ListItem>
  </List>
  Although the fps will decrease when taking three stages, the accuracy of digits is higher than end-to-end training.
  By doing so, the accuracy is 99.8%.
</Box>
