`timescale 1ns / 10ps
module Compare
(
   input wire [0:8191] fucktonofhashes,
  	input wire [0:127] outputhash,
   output reg [0:6] match
   
);
  always_comb begin
    if(fucktonofhashes[0*128:0*128 + 127] == outputhash)match = 0;
    else if(fucktonofhashes[1*128:1*128 + 127] == outputhash)match = 1;
    else if(fucktonofhashes[2*128:2*128 + 127] == outputhash)match = 2;
    else if(fucktonofhashes[3*128:3*128 + 127] == outputhash)match = 3;
    else if(fucktonofhashes[4*128:4*128 + 127] == outputhash)match = 4;
    else if(fucktonofhashes[5*128:5*128 + 127] == outputhash)match = 5;
    else if(fucktonofhashes[6*128:6*128 + 127] == outputhash)match = 6;
    else if(fucktonofhashes[7*128:7*128 + 127] == outputhash)match = 7;
    else if(fucktonofhashes[8*128:8*128 + 127] == outputhash)match = 8;
    else if(fucktonofhashes[9*128:9*128 + 127] == outputhash)match = 9;
    else if(fucktonofhashes[10*128:10*128 + 127] == outputhash)match = 10;
    else if(fucktonofhashes[11*128:11*128 + 127] == outputhash)match = 11;
    else if(fucktonofhashes[12*128:12*128 + 127] == outputhash)match = 12;
    else if(fucktonofhashes[13*128:13*128 + 127] == outputhash)match = 13;
    else if(fucktonofhashes[14*128:14*128 + 127] == outputhash)match = 14;
    else if(fucktonofhashes[15*128:15*128 + 127] == outputhash)match = 15;
    else if(fucktonofhashes[16*128:16*128 + 127] == outputhash)match = 16;
    else if(fucktonofhashes[17*128:17*128 + 127] == outputhash)match = 17;
    else if(fucktonofhashes[18*128:18*128 + 127] == outputhash)match = 18;
    else if(fucktonofhashes[19*128:19*128 + 127] == outputhash)match = 19;
    else if(fucktonofhashes[20*128:20*128 + 127] == outputhash)match = 20;
    else if(fucktonofhashes[21*128:21*128 + 127] == outputhash)match = 21;
    else if(fucktonofhashes[22*128:22*128 + 127] == outputhash)match = 22;
    else if(fucktonofhashes[23*128:23*128 + 127] == outputhash)match = 23;
    else if(fucktonofhashes[24*128:24*128 + 127] == outputhash)match = 24;
    else if(fucktonofhashes[25*128:25*128 + 127] == outputhash)match = 25;
    else if(fucktonofhashes[26*128:26*128 + 127] == outputhash)match = 26;
    else if(fucktonofhashes[27*128:27*128 + 127] == outputhash)match = 27;
    else if(fucktonofhashes[28*128:28*128 + 127] == outputhash)match = 28;
    else if(fucktonofhashes[29*128:29*128 + 127] == outputhash)match = 29;
    else if(fucktonofhashes[30*128:30*128 + 127] == outputhash)match = 30;
    else if(fucktonofhashes[31*128:31*128 + 127] == outputhash)match = 31;
    else if(fucktonofhashes[32*128:32*128 + 127] == outputhash)match = 32;
    else if(fucktonofhashes[33*128:33*128 + 127] == outputhash)match = 33;
    else if(fucktonofhashes[34*128:34*128 + 127] == outputhash)match = 34;
    else if(fucktonofhashes[35*128:35*128 + 127] == outputhash)match = 35;
    else if(fucktonofhashes[36*128:36*128 + 127] == outputhash)match = 36;
    else if(fucktonofhashes[37*128:37*128 + 127] == outputhash)match = 37;
    else if(fucktonofhashes[38*128:38*128 + 127] == outputhash)match = 38;
    else if(fucktonofhashes[39*128:39*128 + 127] == outputhash)match = 39;
    else if(fucktonofhashes[40*128:40*128 + 127] == outputhash)match = 40;
    else if(fucktonofhashes[41*128:41*128 + 127] == outputhash)match = 41;
    else if(fucktonofhashes[42*128:42*128 + 127] == outputhash)match = 42;
    else if(fucktonofhashes[43*128:43*128 + 127] == outputhash)match = 43;
    else if(fucktonofhashes[44*128:44*128 + 127] == outputhash)match = 44;
    else if(fucktonofhashes[45*128:45*128 + 127] == outputhash)match = 45;
    else if(fucktonofhashes[46*128:46*128 + 127] == outputhash)match = 46;
    else if(fucktonofhashes[47*128:47*128 + 127] == outputhash)match = 47;
    else if(fucktonofhashes[48*128:48*128 + 127] == outputhash)match = 48;
    else if(fucktonofhashes[49*128:49*128 + 127] == outputhash)match = 49;
    else if(fucktonofhashes[50*128:50*128 + 127] == outputhash)match = 50;
    else if(fucktonofhashes[51*128:51*128 + 127] == outputhash)match = 51;
    else if(fucktonofhashes[52*128:52*128 + 127] == outputhash)match = 52;
    else if(fucktonofhashes[53*128:53*128 + 127] == outputhash)match = 53;
    else if(fucktonofhashes[54*128:54*128 + 127] == outputhash)match = 54;
    else if(fucktonofhashes[55*128:55*128 + 127] == outputhash)match = 55;
    else if(fucktonofhashes[56*128:56*128 + 127] == outputhash)match = 56;
    else if(fucktonofhashes[57*128:57*128 + 127] == outputhash)match = 57;
    else if(fucktonofhashes[58*128:58*128 + 127] == outputhash)match = 58;
    else if(fucktonofhashes[59*128:59*128 + 127] == outputhash)match = 59;
    else if(fucktonofhashes[60*128:60*128 + 127] == outputhash)match = 60;
    else if(fucktonofhashes[61*128:61*128 + 127] == outputhash)match = 61;
    else if(fucktonofhashes[62*128:62*128 + 127] == outputhash)match = 62;
    else if(fucktonofhashes[63*128:63*128 + 127] == outputhash)match = 63;
    else match = 64;    
      
  end
endmodule
