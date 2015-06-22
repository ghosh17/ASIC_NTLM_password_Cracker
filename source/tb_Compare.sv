`timescale 1ns / 10ps
module tb_Compare();

reg [0:8191] tb_fucktonofhashes;
reg [0:127] tb_outputhash;
reg [0:6] tb_match;

reg [0:6] match_flag;


Compare DUT(

  .fucktonofhashes(tb_fucktonofhashes),
  .outputhash(tb_outputhash),
  .match(tb_match)
  
);

	initial
	begin 
	  
	  //Testcase 1 To check whether or not the first hash address compares to the output 
	  
	   tb_fucktonofhashes[0*128:0*128 + 127] = 128'b01100110111100111011111110101111101101101111110001101001010000011111000110001001110000001010101011110110000000111110000101100101; 
	   tb_outputhash = 128'b01100110111100111011111110101111101101101111110001101001010000011111000110001001110000001010101011110110000000111110000101100101;
	   
	   if (tb_fucktonofhashes[0*128:0*128 + 127] == tb_outputhash) begin
	      match_flag = 0;
	      
	     end
	     else begin
	       match_flag = 64;
	       end
	     
	  //Testcase 2 Checks whether the second address immediately after the first output is correct
	  	tb_fucktonofhashes[1*128:1*128 + 127] = 128'b01011001110111111000000000111110011001101100000001110100111000001010001011011011100011101101010000010010001010100100111010011111; 
	   tb_outputhash = 128'b01011001110111111000000000111110011001101100000001110100111000001010001011011011100011101101010000010010001010100100111010011111;
	   
	   if (tb_fucktonofhashes[1*128:1*128 + 127] == tb_outputhash) begin
	     match_flag = 1;
	     end
	     else begin
	       match_flag = 64;
	       end
	       
	  //Testcase 3 checks whether an address in the middle of the algorithm calculation as well as the address storage calculation is correct
	  	tb_fucktonofhashes[39*128:39*128 + 127] = 128'b10101110000000000111100110110011111010111001110100001111011011101111011010011110000100110110110010110000011001001000100000101100; 
	   tb_outputhash = 128'b10101110000000000111100110110011111010111001110100001111011011101111011010011110000100110110110010110000011001001000100000101100; 
	   
	   if (tb_fucktonofhashes[39*128:39*128 + 127] == tb_outputhash) begin
	     match_flag = 39;
	     end
	     else begin
	       match_flag = 64;
	       end
	       
	  //Testcase 4 checks if the last address is correct
	  	tb_fucktonofhashes[63*128:63*128 + 127] = 128'b00111000101010001011001101011100100111011111000001110000111001000011000000100101010010010010000110001010111011010000110110111100;
	   tb_outputhash = 128'b00111000101010001011001101011100100111011111000001110000111001000011000000100101010010010010000110001010111011010000110110111100;
	   
	   if (tb_fucktonofhashes[63*128:63*128 + 127] == tb_outputhash) begin
	     match_flag = 63;
	     end
	     else begin
	       match_flag = 64;
	       end
	       
	  //Testcase 5 checks if the addresses don't match function i.e. match 64 is working
	  	//Test same address
	  	tb_fucktonofhashes[3*128:3*128 + 127] = 128'b10101110000000000111100110110011111010111001110100001111011011101111011010011110000100110110110010110000011001001000100000101100;
	   tb_outputhash = 128'b01011001110111111000000000111110011001101100000001110100111000001010001011011011100011101101010000010010001010100100111010011111;
	   
	   if (tb_fucktonofhashes[3*128:3*128 + 127] == tb_outputhash) begin
	     match_flag = 3;
	     end
	     else begin
	       match_flag = 64;
	       end
	       
	  	//Testcase 6 checks if the addresses don't match function i.e. match 64 is working
	  	//Test two different addresses
	  	tb_fucktonofhashes[0*128:0*128 + 127] = 128'b01100110111100111011111110101111101101101111110001101001010000011111000110001001110000001010101011110110000000111110000101100101;
	   tb_outputhash = 128'b00111000101010001011001101011100100111011111000001110000111001000011000000100101010010010010000110001010111011010000110110111100;
	   
	   if (tb_fucktonofhashes[0*128:0*128 + 127] == tb_outputhash) begin
	     match_flag = 0;
	     end
	     else begin
	       match_flag = 64;
	       end
	       
	  
	end
	
endmodule
	
