library verilog;
use verilog.vl_types.all;
entity Calculate_NTLM_reg is
    generic(
        ai              : integer := 1732584193;
        bi              : vl_logic_vector(31 downto 0) := (Hi1, Hi1, Hi1, Hi0, Hi1, Hi1, Hi1, Hi1, Hi1, Hi1, Hi0, Hi0, Hi1, Hi1, Hi0, Hi1, Hi1, Hi0, Hi1, Hi0, Hi1, Hi0, Hi1, Hi1, Hi1, Hi0, Hi0, Hi0, Hi1, Hi0, Hi0, Hi1);
        ci              : vl_logic_vector(31 downto 0) := (Hi1, Hi0, Hi0, Hi1, Hi1, Hi0, Hi0, Hi0, Hi1, Hi0, Hi1, Hi1, Hi1, Hi0, Hi1, Hi0, Hi1, Hi1, Hi0, Hi1, Hi1, Hi1, Hi0, Hi0, Hi1, Hi1, Hi1, Hi1, Hi1, Hi1, Hi1, Hi0);
        di              : integer := 271733878;
        root2           : integer := 1518500249;
        root3           : integer := 1859775393
    );
    port(
        clk             : in     vl_logic;
        n_rst           : in     vl_logic;
        instr           : in     vl_logic_vector(0 to 127);
        length          : in     vl_logic_vector(0 to 3);
        hash            : out    vl_logic_vector(0 to 127);
        outstr          : out    vl_logic_vector(0 to 127)
    );
    attribute mti_svvh_generic_type : integer;
    attribute mti_svvh_generic_type of ai : constant is 1;
    attribute mti_svvh_generic_type of bi : constant is 1;
    attribute mti_svvh_generic_type of ci : constant is 1;
    attribute mti_svvh_generic_type of di : constant is 1;
    attribute mti_svvh_generic_type of root2 : constant is 1;
    attribute mti_svvh_generic_type of root3 : constant is 1;
end Calculate_NTLM_reg;
