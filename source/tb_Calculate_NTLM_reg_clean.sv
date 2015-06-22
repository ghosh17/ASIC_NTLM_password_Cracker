`timescale 1ns / 10ps

module tb_Calculate_NTLM_reg();
  
  parameter CLK_PERIOD				= 10;
  reg [0:127] tb_instr;
  reg [0:3] tb_length;
  reg [0:127] tb_hash;
  reg tb_clk;
  reg tb_n_rst;
  
  //Generate clock signal
  always
	begin : CLK_GEN
		tb_clk = 1'b0;
		#(CLK_PERIOD / 2);
		tb_clk = 1'b1;
		#(CLK_PERIOD / 2);
	end

	Calculate_NTLM_reg DUT
	(
   	.instr(tb_instr),
		.length(tb_length),
		.hash(tb_hash),
    .clk(tb_clk),
    .n_rst(tb_n_rst)
	);
	
	
	initial
	begin 
	   //Start witht the inputs at something
		 tb_instr = 128'b01110000011000010111001101110011011101110110111100000000000000000000000000000000000000000000000000000000000000000000000000000000;
		 tb_length = 6;
		 tb_n_rst = 0;
		 //Wait a clock cycle
    	#CLK_PERIOD
    	//Wait a little longer so to not release reset on a clock edge
    	#1
    	//Turn off the reset and wait a clock cycle
    	tb_n_rst = 1;
    	#CLK_PERIOD
    //Change the inputs, wait a cycle, etc.
    	tb_instr = 128'b01110000011000010111001101110011011101110110111101110010000000000000000000000000000000000000000000000000000000000000000000000000;
		 tb_length = 7;
		 #CLK_PERIOD

    	tb_instr = 128'b01110000011000010111001101110011011101110110111101110010011001000000000000000000000000000000000000000000000000000000000000000000;
		 tb_length = 8;

    end
endmodule