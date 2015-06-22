// $Id: $
// File name:   generate_guess.sv
// Created:     2/4/2015
// Author:      Clayton Brandt
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: Outputs the next ascii value thats the next "guess"

module generate_guess
 #(
   parameter NUM_CNT_BITS = 128
   )
  (
   input wire clk,
   input wire n_rst,
   input wire start_bit,
   output wire [(NUM_CNT_BITS-1):0] flip_guess_out,
   output wire [(NUM_CNT_BITS-1):0] guess,
   output wire [0:3] length
   );

   reg [0:3]   strlen;
   reg [0:3]   next_strlen;
   reg [(NUM_CNT_BITS-1):0] curr_guess;
   reg [(NUM_CNT_BITS-1):0] next_guess;
   reg [(NUM_CNT_BITS-1):0] flip_guess;
   reg [(NUM_CNT_BITS-1):0] next_flip_guess;
   
   assign guess = curr_guess;
   assign length = next_strlen;
   assign flip_guess_out = flip_guess;
   
   always_ff @ (posedge clk, negedge n_rst)
     begin: RESET_LOGIC
	if(n_rst == 1'b0)
	  begin
	     next_strlen <= 0;
	     curr_guess <= 128'b0;
	     flip_guess <= 128'b0;
	  end

	else
	  begin
	     curr_guess <= next_guess;
	     flip_guess <= next_flip_guess;
	     next_strlen <= strlen;
	  end
     end // block: RESET_LOGIC

 
   	  

   always_comb
     begin: NEXT_LOGIC
	next_flip_guess = curr_guess;
	
	next_guess = curr_guess;
	strlen = 1;
	

	
	
	if(next_guess[7:0] < 8'b00100000  && next_guess[7:0] > 8'b00000000)
	  next_guess[7:0] = 8'b00011111;
	else if (next_guess[7:0] >= 8'b01111110)
	  begin
	     next_guess[7:0] = 8'b00011111;
	     
	     next_guess[15:8] = next_guess[15:8] + 1;
	  end
	     
	

	if(next_guess[15:8] < 8'b00100000  && next_guess[15:8] > 8'b00000000)
	  next_guess[15:8] = 8'b00100000;
	else if (next_guess[15:8] >= 8'b01111110)
	  begin
	     next_guess[15:8] = 8'b00100000;
	     
	     next_guess[23:16] = next_guess[23:16] + 1;
	  end
		     
	if(next_guess[23:16] < 8'b00100000  && next_guess[23:16] > 8'b00000000)
	  next_guess[23:16] = 8'b00100000;
	else if (next_guess[23:16] >= 8'b01111110)
	  begin
	     next_guess[23:16] = 8'b00100000;
	     
	     next_guess[31:24] = next_guess[31:24] + 1;
	  end
     
	  	
	if(next_guess[31:24] < 8'b00100000  && next_guess[31:24] > 8'b00000000)
	  next_guess[31:24] = 8'b00100000;
	else if (next_guess[31:24] >= 8'b01111110)
	  begin
	     next_guess[31:24] = 8'b00100000;
	     
	     next_guess[39:32] = next_guess[39:32] + 1;
	  end

	if(next_guess[39:32] < 8'b00100000  && next_guess[39:32] > 8'b00000000)
	  next_guess[39:32] = 8'b00100000;
	else if (next_guess[39:32] >= 8'b01111110)
	  begin
	     next_guess[39:32] = 8'b00100000;
	     if(next_guess[47:40] == 0)
	       next_guess[47:40] = next_guess[47:40] + 1;
	  end

	if(next_guess[47:40] < 8'b00100000  && next_guess[47:40] > 8'b00000000)
	  next_guess[47:40] = 8'b00100000;
	else if (next_guess[47:40] >= 8'b01111110)
	  begin
	     next_guess[47:40] = 8'b00100000;
	     
	     next_guess[55:48] = next_guess[55:48] + 1;
	  end

	if(next_guess[55:48] < 8'b00100000  && next_guess[55:48] > 8'b00000000)
	  next_guess[55:48] = 8'b00100000;
	else if (next_guess[55:48] >= 8'b01111110)
	  begin
	     next_guess[55:48] = 8'b00100000;
	     
	     next_guess[63:56] = next_guess[63:56] + 1;
	  end
	
	if(next_guess[63:56] < 8'b00100000  && next_guess[63:56] > 8'b00000000)
	  next_guess[63:56] = 8'b00100000;
	else if (next_guess[63:56] >= 8'b01111110)
	  begin
	     next_guess[63:56] = 8'b00100000;
	     
	     next_guess[71:64] = next_guess[71:64] + 1;
	  end

	if(next_guess[71:64] < 8'b00100000  && next_guess[71:64] > 8'b00000000)
	  next_guess[71:64] = 8'b00100000;
	else if (next_guess[71:64] >= 8'b01111110)
	  begin
	     next_guess[71:64] = 8'b00100000;
	     if(next_guess[79:72] == 0)
	       next_guess[79:2] = next_guess[79:72] + 1;
	  end

	if(next_guess[79:72] < 8'b00100000  && next_guess[79:72] > 8'b00000000)
	  next_guess[79:72] = 8'b00100000;
	else if (next_guess[79:72] >= 8'b01111110)
	  begin
	     next_guess[79:72] = 8'b00100001;
	     
	     next_guess[87:80] = next_guess[87:80] + 1;
	  end

	if(next_guess[87:80] < 8'b00100000  && next_guess[87:80] > 8'b00000000)
	  next_guess[87:80] = 8'b00100000; // 
	else if (next_guess[87:80] >= 8'b01111110)
	  begin
	     next_guess[87:80] = 8'b00100000;
	     if(next_guess[95:88] == 0)
	       next_guess[95:88] = next_guess[95:88] + 1;
	  end

	if(next_guess[95:88] < 8'b00100000  && next_guess[95:88] > 8'b00000000)
	  next_guess[95:88] = 8'b00100000; // 
	else if (next_guess[95:88] >= 8'b01111110)
	  begin
	     next_guess[95:88] = 8'b00100000;
	          
	     next_guess[103:96] = next_guess[103:96] + 1;
	  end

	if(next_guess[103:96] < 8'b00100000  && next_guess[103:96] > 8'b00000000)
	  next_guess[103:96] = 8'b00100000; // 
	else if (next_guess[103:96] >= 8'b01111110)
	  begin
	     next_guess[103:96] = 8'b00100000;
	    
	     next_guess[111:104] = next_guess[111:104] + 1;
	  end

	if(next_guess[111:104] < 8'b00100000  && next_guess[111:104] > 8'b00000000)
	  next_guess[111:104] = 8'b00100001; // 
	else if (next_guess[111:104] >= 8'b01111110)
	  begin
	     next_guess[111:104] = 8'b00100000;
	     
	     next_guess[119:112] = next_guess[119:112] + 1;
	  end

	if(next_guess[119:112] < 8'b00100000  && next_guess[119:112] > 8'b00000000)
	  next_guess[119:112] = 8'b00100001; // 
	else if (next_guess[119:112] >= 8'b01111110)
	  begin
	     next_guess[119:112] = 8'b00100000;
	     
	     next_guess[127:120] = next_guess[127:120] + 1;
	  end
	
	if(next_guess[127:120] != 0)
	  strlen = 16;
	else if(next_guess[119:112] != 0)
	  strlen = 15;
	else if(next_guess[111:104] != 0)
	  strlen = 14;
	else if(next_guess[103:96] != 0)
	  strlen = 13;
	else if(next_guess[95:88] != 0)
	  strlen = 12;
	else if(next_guess[87:80] != 0)
	  strlen = 11;
	else if(next_guess[79:72] != 0)
	  strlen = 10;
	else if(next_guess[71:64] != 0)
	  strlen = 9;
	else if(next_guess[63:56] != 0)
	  strlen = 8;
	else if(next_guess[55:48] != 0)
	  strlen = 7;
	else if(next_guess[47:40] != 0)
	  strlen = 6;
	else if(next_guess[39:32] != 0)
	  strlen = 5;
	else if(next_guess[31:24] != 0)
	  strlen = 4;
	else if(next_guess[23:16] != 0)
	  strlen = 3;
	else if(next_guess[15:8] != 0)
	  strlen = 2;
	else if(next_guess[7:0] != 0)
	  strlen = 1;
		
	  
	if (start_bit == 1'b1)
	  begin
	     if (next_guess == 0)
	       begin
		  next_guess[7:0] = 8'b00100000;
		  next_flip_guess[127:120] = 8'b00100000;
	       end
	     else
	       begin	   
		  next_guess = next_guess + 1;
		  next_flip_guess = 128'b0;
		  
		  if(strlen == 1)
		    next_flip_guess[127:120] = next_guess[7:0];
		  if(strlen == 2)
		    next_flip_guess[127:112] = next_guess[15:0];
		  if(strlen == 3)
		    next_flip_guess[127:104] = next_guess[23:0];
		  if(strlen == 4)
		    next_flip_guess[127:96] = next_guess[31:0];
		  if(strlen == 5)
		    next_flip_guess[127:88] = next_guess[39:0];
		  if(strlen == 6)
		    next_flip_guess[127:80] = next_guess[47:0];
		  if(strlen == 7)
		    next_flip_guess[127:72] = next_guess[55:0];
		  if(strlen == 8)
		    next_flip_guess[127:64] = next_guess[63:0];
		  if(strlen == 9)
		    next_flip_guess[127:56] = next_guess[71:0];
		  if(strlen == 10)
		    next_flip_guess[127:48] = next_guess[79:0];
		  if(strlen == 11)
		    next_flip_guess[127:40] = next_guess[87:0];
		  if(strlen == 12)
		    next_flip_guess[127:32] = next_guess[95:0];
		  if(strlen == 13)
		    next_flip_guess[127:24] = next_guess[103:0];
		  if(strlen == 14)
		    next_flip_guess[127:16] = next_guess[111:0];
		  if(strlen == 15)
		    next_flip_guess[127:8] = next_guess[119:0];
		  if(strlen == 16)
		    next_flip_guess[127:0] = next_guess[127:0];
	       end
	  end

     end // block: NEXT_LOGIC

  
   
   
endmodule
	     
   
			   
