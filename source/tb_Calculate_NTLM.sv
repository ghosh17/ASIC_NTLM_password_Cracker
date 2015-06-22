// Code your testbench here
// or browse Examples
`timescale 1ns / 10ps

module tb_Calculate_NTLM();
  
    reg [0:127] tb_instr;
    reg [0:3] tb_length;
    reg [0:127] tb_hash;
  	reg [0:511] tb_buff;
  reg [0:31] tb_a16;
  reg [0:31] tb_b16;
  reg [0:31] tb_c16;
  reg [0:31] tb_d16;

	Calculate_NTLM DUT
	(
    	.instr(tb_instr),
		.length(tb_length),
		.hash(tb_hash),
      	.buff(tb_buff),
      .a4(tb_a16),
      .b4(tb_b16),
      .c4(tb_c16),
      .d4(tb_d16)
	);
	
	
	initial
	begin
		tb_instr = 128'b01110000011000010111001101110011011101110110111100000000000000000000000000000000000000000000000000000000000000000000000000000000;
		tb_length = 6;
    	#1000
      $display ("Current Value of nt_buffer = %h\n", tb_buff);
      $display ("Current Value of hash = %h\n", tb_hash);
      //$display ("a16 = %h\n", tb_a16);
      //$display ("b16 = %h\n", tb_b16);
      //$display ("c16 = %h\n", tb_c16);
      //$display ("d16 = %h\n", tb_d16);
    end
endmodule