// $Id: $
// File name:   flex_stp_sr
// Created:     2/4/2015
// Author:      Thomas Yurek
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: serial to parallel sr
`timescale 1ns / 100ps

module giant_hash_sr
(
  input wire clk,
  input wire n_rst,
  input wire shift_enable,
  input wire [7:0]serial_in,
  output reg [8191:0] parallel_out
);
  always @ (posedge clk, negedge n_rst) begin
    if (n_rst == 0) begin
      parallel_out <= 0;
    end
    else if (shift_enable != 1) begin
      parallel_out <= parallel_out;
    end
    else begin
      parallel_out <= parallel_out << 8;
      parallel_out[7:0] <= serial_in;
    end
  end
endmodule 