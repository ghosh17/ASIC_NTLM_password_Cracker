

module hashcracker
  (
   input wire clk,
   input wire n_rst,
   output reg read_enable,
   output reg write_enable,
   output reg [0:9] address,
   input wire [0:127] read_data,
   output reg [0:127] write_data,
   input wire rx_in,
   output reg tx_out
   );
   reg [127:0] guess;
   reg [127:0] flip_guess;
   reg [127:0] outputhash;
   reg [127:0] outstr;
   reg [0:127] strnext;
   reg [0:9] read_address;
   reg [0:9] read_next_address;
   reg data_ready_posedge;
   reg falling_edge_found;
   reg shift_en;
   
   reg clk_div;
   reg [0:6] match;
   reg [0:8191] allthehashes;
   reg [0:3] strlen;
   reg [0:7] out_byte;
   reg [0:7] shift_byte;
   reg shift_out;
   reg data_ready;
   reg [0:7] rx_out;
   reg start_bit;
   reg tx_done;
       
   generate_guess GG(.clk(clk), .n_rst(n_rst), .start_bit(start_bit), .guess(guess), .flip_guess_out(flip_guess), .length(strlen));

   Compare CMP(.fucktonofhashes(allthehashes), .outputhash(outputhash), .match(match));

   Calculate_NTLM_reg NTLM(.clk(clk), .n_rst(n_rst), .instr(flip_guess), .length(strlen), .hash(outputhash), .outstr(outstr));
   
   edge_detector EDGE (.clk(clk), .n_rst(n_rst), .data_ready(data_ready), .rising_edge_found(data_ready_posedge), .falling_edge_found(falling_edge_found));
   
   giant_hash_sr GHSR (.clk(clk), .n_rst(n_rst), .shift_enable(shift_en), .serial_in(shift_byte), .parallel_out(allthehashes));
   
   controller CRTL (.clk(clk), .n_rst(n_rst), .rx_in(rx_out), .shift_en(shift_en), .outstr(outstr), .data_ready(data_ready), .tx_done(tx_done), .out_byte(out_byte), .shift_byte(shift_byte), .shift_out(shift_out), .read_enable(read_enable), .write_enable(write_enable), .address(address), .read_data(read_data), .write_data(write_data), .start_bit(start_bit), .match(match), .data_ready_posedge(data_ready_posedge));
   
   Clock_Divider CLKDIV (.clk(clk), .n_rst(n_rst), .clk_div(clk_div));
	
	 tx_data TX(.n_rst(n_rst), .clk(clk),  .pwd(out_byte),  .passcrack(shift_out),  .done_flag(tx_done),  .tx_out(tx_out));
	 
	 rcv_block RX (.n_rst(n_rst), .clk(clk), .serial_in(rx_in),.rx_data(rx_out),.data_ready(data_ready),.overrun_error(overrun_error), .framing_error(framing_error));

endmodule