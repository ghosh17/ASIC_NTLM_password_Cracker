// $Id: $
// File name:   flex_stp_sr
// Created:     2/4/2015
// Author:      Thomas Yurek
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: serial to parallel sr
`timescale 1ns / 100ps

module flex_stp_sr
#(
  parameter NUM_BITS = 4,
  parameter SHIFT_MSB = 1
)
(
  input wire clk,
  input wire n_rst,
  input wire shift_enable,
  input wire serial_in,
  output reg [(NUM_BITS - 1):0] parallel_out
);
  reg [5:0] i;
  always @ (posedge clk, negedge n_rst) begin
    if (n_rst == 0) begin
      for (i = 0; i < NUM_BITS; i = i + 1)
      begin
        parallel_out[i] <= 1;
      end
    end

    else if (shift_enable != 1) begin
      parallel_out <= parallel_out;
    end
    else if (SHIFT_MSB == 0) begin
      parallel_out <= parallel_out >> 1;
      parallel_out[NUM_BITS - 1] <= serial_in;
    end
    else begin
      parallel_out <= parallel_out << 1;
      parallel_out[0] <= serial_in;
    end
  end
endmodule 