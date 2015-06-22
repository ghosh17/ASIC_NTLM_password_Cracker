// $Id: $
// File name:   flex_pts_sr
// Created:     2/4/2015
// Author:      Thomas Yurek
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: parallel to serial sr
module flex_pts_sr
#(
  parameter NUM_BITS = 4,
  parameter SHIFT_MSB = 1
)
(
  input wire clk,
  input wire n_rst,
  input wire shift_enable,
  input wire load_enable,
  input wire [(NUM_BITS - 1):0] parallel_in,
  output reg serial_out
);
  reg [5:0] i;
  reg [(NUM_BITS - 1):0] internal;
  always @ (posedge clk, negedge n_rst) begin
    if (n_rst == 0) begin
      for (i = 0; i < NUM_BITS; i = i + 1)
      begin
        internal[i] <= 1;
      end
    end
    else if (load_enable == 1) begin
      for (i = 0; i < NUM_BITS; i = i + 1)
      begin
        internal[i] <= parallel_in[i];
      end
    end
    else if (shift_enable != 1) begin
    end
    else if (SHIFT_MSB == 0) begin
      //serial_out <= internal[0];
      internal <= internal >> 1;
      internal[NUM_BITS - 1] <= 1;
    end
    else begin
      //serial_out <= internal[(NUM_BITS - 1)];
      internal <= internal << 1;
      internal[0] <= 1;
    end
  end
  assign serial_out = internal[SHIFT_MSB * (NUM_BITS - 1)];
endmodule 