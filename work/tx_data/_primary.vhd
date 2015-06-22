library verilog;
use verilog.vl_types.all;
entity tx_data is
    port(
        n_rst           : in     vl_logic;
        clk             : in     vl_logic;
        pwd             : in     vl_logic_vector(7 downto 0);
        passcrack       : in     vl_logic;
        done_flag       : out    vl_logic;
        tx_out          : out    vl_logic
    );
end tx_data;
