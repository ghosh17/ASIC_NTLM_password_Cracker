// $Id: $
// File name:   tb_controller.sv
// Created:     2/4/2015
// Author:      Clayton Brandt
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: Testbench for generating guesses.

`timescale 1ns / 10ps

module tb_controller
  ();
   //Define local parameters used by the test bench
   
   //parameters: clk and delay(?)
   localparam CLK_PER = 10;
   localparam DELAY = 1;
   
   //Create clk tb_clk type reg
   reg clock;

   //Local Paramenters
   localparam INPUT_BITS = 128;
   

   //Create variables type reg for needed ports
   
   reg 	   tb_n_rst;
   reg 	   tb_clear;
   reg 	   tb_start_bit;
   reg [0:8191] tb_allhashes;
   
   reg [0:3] 	tb_strlen;
   reg [0:6] 	tb_match;
   reg tb_read_enable;
   reg tb_write_enable;
   reg [0:9] tb_address;
   reg [127:0] tb_read_data;
   reg [127:0] tb_write_data;
   reg tb_mem_clr;
   reg tb_mem_dump;
   reg [0:8] tb_start_add;
   reg [0:8] tb_end_add;
   reg tb_progress_request_byte_detected;
   reg [0:7] tb_out_byte;
   reg tb_shift_out;
   reg tb_mem_init;
   reg tx_out;
   reg tb_tx_done_flag;
   reg tb_over_run_error;
   reg tb_framing_error;
   reg [0:7] tb_rx_in;
   reg [0:7]sys_in_byte;
	 reg sys_tx_in; 
	 //reg tb_clk_div;
	 reg [0:7] tb_shift_byte;
   
   //DUT Port map
   controller DUT
   (
      .clk(clock), 
      .n_rst(tb_n_rst),
      .start_bit(tb_start_bit),
      .match(tb_match), 
      .strlen(tb_strlen),
      .read_enable(tb_read_enable),
		  .write_enable(tb_write_enable),//Originally commented out
		  .address(tb_address),
		  .read_data(tb_read_data),
		  .write_data(tb_write_data),
		  .progress_request_byte_detected(tb_progress_request_byte_detected),
		  .out_byte(tb_out_byte),
		  .shift_out(tb_shift_out),
		  .tx_done(tb_tx_done_flag),
		  .rx_in(tb_rx_in),
		  .allthehashes(tb_allhashes),
		  .shift_byte(tb_shift_byte),
		  .data_ready(1'b1)
    );
   
   on_chip_sram_wrapper RAM
	(
		// Test bench control signals
		.mem_clr(tb_mem_clr),
		.mem_init(tb_mem_init),
		.mem_dump(tb_mem_dump),
		.verbose(32'b00000000000000000000000000000000),
		.init_file_number(0),
		.dump_file_number(0),
		.start_address(tb_start_add),
		.last_address(tb_end_add),
		// Memory interface signals
		.read_enable(tb_read_enable),
		.write_enable(tb_write_enable),
		.address(tb_address),
		.read_data(tb_read_data),
		.write_data(tb_write_data)
	);
	
	//Clock_Divider CLKDIV (.clk(clock), .n_rst(tb_n_rst), .clk_div(tb_clk_div));
	
	tx_data TX
	(
	   .n_rst(tb_n_rst), 
	   .clk(clock), 
	   .pwd(tb_out_byte), 
	   .passcrack(tb_shift_out), 
	   .done_flag(tb_tx_done_flag), 
	   .tx_out(tx_out)
	);
	/*
	rcv_block RX
	(
	  .n_rst(tb_n_rst), 
	  .clk(tb_clk_div), 
    .serial_in(rx_in),
    .rx_data(tb_rx_in),
    .data_ready(tb_data_ready),
    .overrun_error(tb_overrun_error),
    .framing_error(tb_framing_error)
	);
	
	tx_data TEST_TX
	(
	   .n_rst(tb_n_rst), 
	   .clk(tb_clk_div), 
	   .pwd(sys_in_byte), 
	   .passcrack(sys_tx_in), 
	   .tx_out(rx_in)
	);
	
*/

   //Clock Generation switch between 1 and 0 for #(CLK_PER/2.0);
   always
     begin
	clock = 1'b0;
	#(CLK_PER/2.0);
	clock = 1'b1;
	#(CLK_PER/2.0);
     end
   	

   
   //Initial begin
   initial
     begin
	
	//Set default values that are regs (ports given as inputs) set to whatevs
	tb_n_rst = 0;
	tb_mem_clr = 0;
	tb_mem_dump = 0;
	tb_start_add = 0;
	tb_end_add = 127;
	sys_tx_in = 0;
	//tb_write_enable = 1;
	//tb_read_enable = 0;
	tb_progress_request_byte_detected = 0;
	#1;
	tb_n_rst = 1;
	tb_mem_clr = 1;
	#1;
	tb_mem_clr = 0;
	sys_in_byte = 8'b00001111;
	sys_tx_in = 1;
	tb_start_bit = 1;
	tb_allhashes[0:383] = 384'h186CB09181E2C2ECAAC768C47C729904E2E35A421944255FEB8EF91A141AC2D56237795E56D95C5BC0B6F7405B31EDF9; //ab and C14//256'h93CC2B4D5D1FCCC38FAB249A9AEDB1E36237795E56D95C5BC0B6F7405B31EDF9;//the strings 'ab' and 'ba'//512'h93CC2B4D5D1FCCC38FAB249A9AEDB1E36237795E56D95C5BC0B6F7405B31EDF92FC8BEA1E2325C1AE5431551193825D95BFA03F997D0153156F3B083AF89D5D5;
  tb_allhashes[384:8191] = 0;
  //tb_mem_init					<= 1;
  #1200
  //tb_read_enable = 1;
  tb_mem_dump = 1;
		#(CLK_PER*3);
	tb_mem_dump = 0;
		//tb_mem_init	<= 0;
	//tb_write_enable = 0;
  #1;
  while(tb_strlen < 2)
    #CLK_PER;
	
  tb_progress_request_byte_detected = 1;
  #CLK_PER;
	//Test toggle for reset

	
     end // initial begin
   
endmodule