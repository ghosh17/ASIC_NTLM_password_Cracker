// $Id: $
// File name:   sr_9bit.sv
// Created:     2/19/2015
// Author:      Thomas Yurek
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: 9bit shiftregister
module sr_9bit
(
  input wire clk,
  input wire n_rst,
  input wire shift_strobe,
  input wire serial_in,
  output reg [7:0] packet_data,
  output reg stop_bit
);
  defparam FSTP2.NUM_BITS = 9;
  defparam FSTP2.SHIFT_MSB = 1;
  reg [8:0] pout;
  flex_stp_sr FSTP2 (.clk(clk), .n_rst(n_rst), .shift_enable(shift_strobe), .serial_in(serial_in), .parallel_out(pout));
  always_comb begin
    stop_bit = pout[0];
    packet_data = pout[8:1];
  end
endmodule