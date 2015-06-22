// $Id: $
// File name:   timer.sv
// Created:     2/17/2015
// Author:      Thomas Yurek
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: lab5 timer
module timer
(
  input wire clk,
  input wire n_rst,
  input wire enable_timer,
  output wire shift_strobe,
  output wire packet_done
);
  defparam IX.NUM_CNT_BITS = 4;
  defparam IIDX.NUM_CNT_BITS = 4;
  reg delayed_enable; //Make it act not on the edge, since the data transmission rate can vary
  reg delayed_enable_next;
  always_ff @ (posedge clk, negedge n_rst) begin
    if (n_rst == 0) begin
      delayed_enable <= 0;
      delayed_enable_next <= 0;
    end
    else begin
      delayed_enable <= delayed_enable_next;
      delayed_enable_next <= enable_timer;
    end
  end
  flex_counter IX (.clk(clk), .n_rst(n_rst), .clear(packet_done), .count_enable(enable_timer), .rollover_val(4'd10), .rollover_flag(shift_strobe));
  flex_counter IIDX (.clk(clk), .n_rst(n_rst), .clear(packet_done), .count_enable(shift_strobe), .rollover_val(4'd9), .rollover_flag(packet_done));
endmodule
