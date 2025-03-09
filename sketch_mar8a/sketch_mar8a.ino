#include <Adafruit_NeoPixel.h>
#ifdef AVR
#include <avr/power.h>
#endif
#define PIN        6
#define NUMPIXELS 8

Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_RGBW + NEO_KHZ800);



void setup() {
  Serial.begin(115200);
  Serial.setTimeout(1);
  pixels.begin();
  pixels.setBrightness(1);

}
float sentiment;
uint32_t colour;
void loop() {
  pixels.clear();
  while(!Serial.available());
  sentiment = Serial.parseFloat();
  if(sentiment <= -0.5) colour = pixels.Color(0,255,0);
  else if(sentiment >= 0.5) colour = pixels.Color(255,0,0);
  else colour = pixels.Color(234,255,0);
  pixels.fill(colour,0,0);
  pixels.show();
}
