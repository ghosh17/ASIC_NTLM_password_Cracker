// $Id: $
// File name:   flex_counter.sv
// Created:     2/6/2015
// Author:      Thomas Yurek
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: counter
module flex_counter
#(
  parameter NUM_CNT_BITS = 4
)
(
  input wire clk,
  input wire n_rst,
  input wire clear,
  input wire count_enable,
  input wire [(NUM_CNT_BITS - 1):0] rollover_val,
  output reg [(NUM_CNT_BITS - 1):0] count_out,
  output reg rollover_flag
);
  reg [(NUM_CNT_BITS - 1):0] i;
  reg [(NUM_CNT_BITS - 1):0] count_next;
  reg rollover_next;
  always_ff @ (posedge clk, negedge n_rst) begin
    if (n_rst == 0) begin
      count_out <= 0;
      rollover_flag <= 0;
    end
    else begin
      count_out <= count_next;
      rollover_flag <= rollover_next;
    end
  end
  always_comb begin
    if(count_enable == 0)count_next = count_out;
    else if(count_out < rollover_val) count_next = (count_out + 1);
    else count_next = 1;
    if(count_enable == 0)rollover_next = rollover_flag;
    else rollover_next = (count_out == rollover_val - 1);
    if (clear) begin
        count_next = 0;
        rollover_next = 0;
    end
  end
endmodule
